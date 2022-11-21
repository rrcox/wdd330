export default class BetterView {
    renderTitle(titleElement, title) {
        titleElement.innerHTML = title;
    }

    renderUser(userElement, user) {
        userElement.innerHTML = `<p>${user.first} ${user.last}, ${user.born}</p>`
    }

    // Other View Methods Here
}