import '../styles/header.scss';

export function Header(){
    return(
        <header className="header">
            <div>
                <img src="/logo.svg" alt="to.do" />
            </div>

            <h3>Minhas tasks</h3>
        </header>
    )
}