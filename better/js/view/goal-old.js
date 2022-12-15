export default (details) => `
    <h1>Goal - ${details.label}</h1>
    <div id="dashboardForm">
        <form onsubmit="return processGoalForm()">
            <label for="target">Target*:</label>
            <input
                type="text"
                id="target"
                name="target"
                value="${details.target}"
                required
            >
            <label for="actual">Actual*:</label>
            <input
                type="text"
                id="actual"
                name="actual"
                value="${details.actual}"
                required
            >
            <input type="submit">
        </form>
    </div>
`;
