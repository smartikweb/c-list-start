function displayData(clients) {
  const ul = document.querySelector("#clientsData");
  clients.forEach(client => {
    const newLi = document.createElement("li");
    newLi.className = "media";
    const avatar = document.createElement("img");
    avatar.className = "mr-3 align-self-center";

    avatar.setAttribute("src", client.avatar);

    newLi.appendChild(avatar);
    newLi.appendChild(createClientDescription(client));
    ul.appendChild(newLi);
  });
  sumAmount(clients);
}
function createClientDescription(client) {
  const div = document.createElement("div");
  div.className = "media-body";
  const textPart1 = document.createTextNode(
    `${client.lastName} ${client.firstName} - `
  );
  const mailLink = document.createElement("a");
  mailLink.setAttribute("href", `mailto: ${client.email}`);
  mailLink.innerHTML = client.email;
  const textPar2 = document.createTextNode(
    ` ${client.gender} (${client.date} - ${client.amount})`
  );
  div.appendChild(textPart1);
  div.appendChild(mailLink);
  div.appendChild(textPar2);
  return div;
}

function sortList(order) {
  const sortedClients = clients.sort((lastClient, nextClient) => {
    // return order == "ascending"
    //   ? lastClient.lastName > nextClient.lastName
    //     ? 1
    //     : -1
    //   : lastClient.lastName < nextClient.lastName
    //   ? 1
    //   : -1;
    if (order == "ascending") {
      return lastClient.lastName > nextClient.lastName ? 1 : -1;
    } else {
      return lastClient.lastName < nextClient.lastName ? 1 : -1;
    }
  });

  redreshData(sortedClients);
}

function redreshData(updateClients) {
  clearList();
  displayData(updateClients);
}

function clearList() {
  const ul = document.querySelector("#clientsData");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
function filterList() {
  const filterString = document
    .querySelector("#filterInput")
    .value.toLowerCase()
    .trim();
  console.log(filterString);

  if (filterString) {
    const filteredClients = clients.filter(client => {
      return (
        client.firstName.toLowerCase().includes(filterString) ||
        client.lastName.toLowerCase().includes(filterString) ||
        client.email.toLowerCase().includes(filterString)
      );
    });

    redreshData(filteredClients);
    filteredClients.length === 0
      ? shoNotFoundSection()
      : showResultListSection();
    showResultListSection();
  }
}

function sumAmount(client) {
  const total = client.reduce((amount, client) => {
    return amount + removeCurrencyFromAmount(client.amount);
  }, 0);
  console.log(total);
  document.querySelectorAll(".totalAmountContainer").forEach(element => {
    element.innerHTML = total.toFixed(2);
  });
}

function removeCurrencyFromAmount(amount) {
  console.log(amount.slice(1));
  return Number(amount.slice(1));
}

function shoNotFoundSection() {
  document.querySelector(".resultList").style.display = "none";
  document.querySelector(".notFound").style.display = "block";
}

function showResultListSection() {
  document.querySelector(".resultList").style.display = "block";
  document.querySelector(".notFound").style.display = "none";
}
