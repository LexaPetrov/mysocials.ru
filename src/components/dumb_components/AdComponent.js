import { useEffect } from 'react'

const AdComponent = props => {
    const { currentPath } = props
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [currentPath])

    return (
        <div key={currentPath}>
            <ins className="adsbygoogle"
                style={{ display: "block", height: '150px' }}
                data-ad-format="fluid"
                data-ad-layout-key="-gc+3r+68-9q-29"
                data-ad-client="ca-pub-7702198175187341"
                data-ad-slot="2128014867"></ins>
        </div>
    )
}

export default AdComponent