export default function Layout(props) {
    const { children } = props

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Coffee Instatiates</p>
            </div>
            <button>
                <p>Sign up free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was originally made by <a target="_blank" href="https://www.smoljames.com">Smoljames</a> <br />using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br /></p>
        </footer>
    )
    return (
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}