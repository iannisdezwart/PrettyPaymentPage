const onCardTabClick = (cardId: string, tabName: string) => {
  const card = document.getElementById(cardId);

  if (!card) {
    throw `Card with id ${cardId} not found`;
  }

  const tabButtons = card.getElementsByClassName("tab-button");

  for (const tabButton of tabButtons) {
    if (tabButton.getAttribute("data-tab-name") === tabName) {
      tabButton.classList.add("selected");
      continue;
    }

    tabButton.classList.remove("selected");
  }

  const cardContentTabs = card.getElementsByClassName("card-content-tab");

  for (const cardContentTab of cardContentTabs) {
    if (cardContentTab.getAttribute("data-tab-name") === tabName) {
      cardContentTab.classList.add("selected");
      continue;
    }

    cardContentTab.classList.remove("selected");
  }
};

const onCardBackClicked = () => {
  history.back();
};
