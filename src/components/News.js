import { news } from '../utils/news'
import Scrollable from './Scrollable'

const News = props => {

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
                                        <small className='news__items-item__date'>{v.date}</small>
                                        <h3 className='news__items-item__title'>{v.title}</h3>
                                        <p className='news__items-item__text'>{v.text.length > 55 ? v.text.substring(0, 55) + '...' : v.text}</p>
                                        <p className='news__items-item__link'>Читать подробнее</p>
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