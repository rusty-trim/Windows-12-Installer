export default function Language({ goToProductKey }: { goToProductKey: () => void }) {
    return (
        <div className="language-box">
            <img src="windows_12_secondary_2.png" draggable={false} alt="" />

            <div className="dropdown-wrapper">
                <label htmlFor="language">Language to install:</label>
                <select className="language" name="language">
                    <option value="us">English (US)</option>
                    <option value="uk">English (UK)</option>
                </select>
            </div>

            <div className="dropdown-wrapper">
                <label htmlFor="time">Time and Currency format:</label>
                <select className="time" name="time">
                    <option value="us">English (US)</option>
                    <option value="uk">English (UK)</option>
                </select>
            </div>

            <div className="dropdown-wrapper">
                <label htmlFor="keyboard">Keyboard or input method:</label>
                <select className="keyboard" name="keyboard">
                    <option value="us">US</option>
                </select>
            </div>

            <p>Enter your preferences and click "Next" to continue</p>

            <div className="footer">
                <p className="copyright">&copy; Microsoft Corporation. All rights reserved.</p>
                <button onClick={goToProductKey}>Next</button>
            </div>

        </div>)
}
