import { ReactNode } from 'react';
import '../styles/modal.scss';

interface PropsModal { 
    children?: ReactNode;
    onClose: () => void;
}

export function Modal({ children, onClose } : PropsModal) {
    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={onClose}/>
                <div className="content">
                    { children }
                </div>
            </div>
        </div>
    )
}

