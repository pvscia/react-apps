import ReactDom from 'react-dom'
import React from 'react'

export default function Portal(props) {
    const { handleCloseModal, children } = props
    return ReactDom.createPortal(
        <div className='portal-container'>
            <div onClick={handleCloseModal} className='portal-underlay'></div>
            <div className='portal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal'))
}