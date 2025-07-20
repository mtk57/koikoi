document.addEventListener('DOMContentLoaded', () => {
    console.log('Game script loaded');

    // Game state
    let deck = [];
    let playerHand = [];
    let opponentHand = [];
    let field = [];
    let playerCaptured = [];
    let opponentCaptured = [];
    let isPlayerTurn = true;

    // DOM Elements
    const playerHandArea = document.getElementById('player-hand');
    const fieldCardsArea = document.getElementById('field-cards');
    const deckSizeSpan = document.getElementById('deck-size');
    const messageArea = document.getElementById('message-area');
    const playerCapturedArea = document.getElementById('player-captured');
    const opponentCapturedArea = document.getElementById('opponent-captured');
    const opponentHandSizeSpan = document.getElementById('opponent-hand-size');

    function createCardElement(cardData, isPlayerCard) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.backgroundImage = `url(${cardData.image})`;
        cardDiv.dataset.month = cardData.month;
        cardDiv.dataset.image = cardData.image; // Keep track of the specific card

        if (isPlayerCard) {
            cardDiv.addEventListener('click', () => handlePlayerCardClick(cardDiv));
        }
        return cardDiv;
    }

    function handlePlayerCardClick(cardElement) {
        if (!isPlayerTurn) return;

        const clickedMonth = cardElement.dataset.month;
        const fieldMatch = Array.from(fieldCardsArea.children).find(c => c.dataset.month === clickedMonth);

        // Move player card to field
        cardElement.remove();
        const cardData = playerHand.find(c => c.image === cardElement.dataset.image);
        playerHand = playerHand.filter(c => c.image !== cardElement.dataset.image);
        
        if (fieldMatch) {
            // Match found on the field
            fieldMatch.remove();
            const fieldCardData = field.find(c => c.image === fieldMatch.dataset.image);
            field = field.filter(c => c.image !== fieldMatch.dataset.image);

            playerCaptured.push(cardData, fieldCardData);
            messageArea.textContent = `場と合いました！`;
        } else {
            // No match, add card to the field
            field.push(cardData);
            messageArea.textContent = `場に合うカードがありません。`;
        }

        renderBoard();
        // Simple delay to simulate thinking and show the result of the first move
        setTimeout(drawFromDeck, 1000);
    }

    function drawFromDeck() {
        if (deck.length === 0) {
            endRound();
            return;
        }

        const drawnCard = deck.pop();
        const drawnMonth = drawnCard.month.toString();
        const fieldMatch = Array.from(fieldCardsArea.children).find(c => c.dataset.month === drawnMonth);

        if (fieldMatch) {
            fieldMatch.remove();
            const fieldCardData = field.find(c => c.image === fieldMatch.dataset.image);
            field = field.filter(c => c.image !== fieldMatch.dataset.image);

            playerCaptured.push(drawnCard, fieldCardData);
            messageArea.textContent = `山札からも合いました！`;
        } else {
            field.push(drawnCard);
            messageArea.textContent = `山札とは合いませんでした。`;
        }
        
        renderBoard();
        //checkForYaku(); // Next step
        setTimeout(startOpponentTurn, 1000);
    }
    
    function checkForYaku(capturedCards, playerType) {
        const capturedImages = capturedCards.map(c => c.image);
        let newYaku = null;

        for (const yakuData of yaku) {
            const hasYaku = yakuData.cards.every(cardImage => capturedImages.includes(cardImage));
            if (hasYaku) {
                // This is a simple check. A real game would need to handle already-claimed yaku.
                newYaku = yakuData;
                break; // Found the highest-value yaku for now
            }
        }

        if (newYaku) {
            if (playerType === 'player') {
                isPlayerTurn = false; // Pause the game
                const actionPanel = document.getElementById('action-panel');
                document.getElementById('yaku-name-panel').textContent = `${newYaku.name} (${newYaku.points}点)`;
                actionPanel.classList.remove('hidden');

                document.getElementById('koikoi-btn').onclick = () => {
                    actionPanel.classList.add('hidden');
                    messageArea.textContent = 'こいこい！ゲーム続行';
                    isPlayerTurn = true; // Give control back if needed, though it should be opponent's turn
                    startOpponentTurn();
                };
                document.getElementById('agari-btn').onclick = () => {
                    actionPanel.classList.add('hidden');
                    alert(`あなたの勝ちです！役: ${newYaku.name}, ${newYaku.points}点`);
                    setupGame(); // Restart for now
                };
            } else {
                // Opponent AI for yaku
                alert(`相手が役を作りました: ${newYaku.name}`);
                setupGame();
            }
        }
    }

    function startOpponentTurn() {
        isPlayerTurn = false;
        messageArea.textContent = '相手の番です。';

        setTimeout(() => {
            // 1. Opponent plays a card from hand
            let playedCard = null;
            let fieldMatch = null;

            for (const handCard of opponentHand) {
                const match = field.find(fieldCard => fieldCard.month === handCard.month);
                if (match) {
                    playedCard = handCard;
                    fieldMatch = match;
                    break;
                }
            }

            if (!playedCard) {
                // No match found, play the first card
                playedCard = opponentHand[0];
            }

            // Move card from hand
            opponentHand = opponentHand.filter(c => c.image !== playedCard.image);
            if (fieldMatch) {
                field = field.filter(c => c.image !== fieldMatch.image);
                opponentCaptured.push(playedCard, fieldMatch);
                messageArea.textContent = "相手が場と合わせました。";
            } else {
                field.push(playedCard);
                messageArea.textContent = "相手は場にカードを出しました。";
            }
            renderBoard();

            // 2. Opponent draws from deck
            setTimeout(() => {
                if (deck.length === 0) { endRound(); return; }
                const drawnCard = deck.pop();
                const drawnMatch = field.find(fieldCard => fieldCard.month === drawnCard.month);

                if (drawnMatch) {
                    field = field.filter(c => c.image !== drawnMatch.image);
                    opponentCaptured.push(drawnCard, drawnMatch);
                    messageArea.textContent = "相手は山札からも合わせました。";
                } else {
                    field.push(drawnCard);
                    messageArea.textContent = "相手は山札とは合いませんでした。";
                }

                renderBoard();
                checkForYaku(opponentCaptured, 'opponent');
                
                // End of opponent's turn
                setTimeout(() => {
                    isPlayerTurn = true;
                    messageArea.textContent = 'あなたの番です。';
                }, 1000);

            }, 1500);

        }, 1500);
    }

    function setupGame() {
        deck = [...cards];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        playerHand = deck.splice(0, 8);
        opponentHand = deck.splice(0, 8);
        field = deck.splice(0, 8);
        playerCaptured = [];
        opponentCaptured = [];
        isPlayerTurn = true;

        renderBoard();
        messageArea.textContent = 'あなたの番です。手札からカードを選んでください。';
    }

    function renderBoard() {
        playerHandArea.innerHTML = '';
        playerHand.forEach(card => {
            playerHandArea.appendChild(createCardElement(card, true));
        });

        fieldCardsArea.innerHTML = '';
        field.forEach(card => {
            fieldCardsArea.appendChild(createCardElement(card, false));
        });

        playerCapturedArea.innerHTML = '';
        playerCaptured.forEach(card => {
            playerCapturedArea.appendChild(createCardElement(card, false));
        });

        opponentCapturedArea.innerHTML = '';
        opponentCaptured.forEach(card => {
            opponentCapturedArea.appendChild(createCardElement(card, false));
        });

        opponentHandSizeSpan.textContent = opponentHand.length;
        deckSizeSpan.textContent = deck.length;
    }

    setupGame();
});
