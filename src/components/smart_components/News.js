import { useState } from 'react'
import { news } from '../../utils/news'
import Modal from '../dumb_components/Modal'
import Scrollable from '../hoc/Scrollable'

const News = props => {
    const [modal, setModal] = useState({})

    const openModal = (v, k) => {
        setModal({
            index: k,
            opened: true
        })
    }

    return (
        <div className='container'>
            <div className='news__wrapper'>
                <h2>Последние новости</h2>
                <Scrollable rootClass='news__items'>
                    {/* <div className='news__items'> */}
                    {
                        news.map((v, k) => {
                            return (
                                <div key={k} className='news__items-item'>

                                    <h3 className='news__items-item__title'>{v.title}</h3>
                                    <p className='news__items-item__text'>{v.text.length > 85 ? v.text.substring(0, 85).trim() + '...' : v.text}</p>
                                    <div className='link__date__wrapper'>
                                        <small className='news__items-item__date'>{v.date}</small>
                                        {
                                            v.text.length > 85 && <p className='news__items-item__link' onClick={() => openModal(v, k)}>Читать подробнее</p>
                                        }
                                    </div>

                                    <Modal style={{ position: 'fixed', bottom: 0, left: 0 }} title={v.title} isOpened={modal.index === k && modal.opened} onModalClose={() => setModal({ index: k, opened: false })}>
                                        {v.text}
                                    </Modal>
                                </div>
                            )
                        })
                    }
                    {/* </div> */}
                </Scrollable>
            </div>
        </div>
    )
}

export default News