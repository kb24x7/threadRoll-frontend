import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Meta } from '../components/Meta'
import { Sidebar } from '../components/Sidebar'
import { RightSidebar } from '../components/RightSidebar'
import { Animation } from '../components/Animation'
import { AvatarGenerator } from 'random-avatar-generator';
import Loading from '../components/Animations/Loading.json'
import styles from '../styles/Home.module.scss'
import { Tweet } from '../components/Tweet'

const splitContent = (content, index) => {
    console.log(content)
    let contentArr = content.substring(280 * index, 280).split(' ')
    contentArr.pop()
    let string = contentArr.join(' ')
    string += '...'
    return string
}


export default function ArticlePage() {
    const [article, setArticle] = useState({})
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const generator = new AvatarGenerator();

    useEffect(async () => {
        const url = window.location.search.split('=')[1] || localStorage.getItem('last')
        const strings = []

        fetch(`https://ar-backend-production.up.railway.app/extract?url=${url}`)
        .then((res) => res.json())
        .then((json) => {
            let asd = []
            asd.push(splitContent(json.content))
            setContent(asd)
            setArticle(json)
            setLoading(false)
            localStorage.setItem('last', url)
        })
    }, [])

    const avatar = generator.generateRandomAvatar()

    return (
        <>
            <Meta title="Article / readRoll" description="Read articles, your way" />
            <div className={styles.mainFlex}>
                <Sidebar active="Article" />
                <div className={styles.mainContent}>
                    <div className={styles.nav}>
                        <h1 className={styles.pageName}>Article</h1>
                    </div>
                    {loading && (
                        <div className={styles.loading}>
                        <div style={{ width: 'calc(40px + 1vw)', height: 'calc(40px + 1vw)', marginTop: '10vh' }}>
                            <Animation json={Loading} />
                        </div>
                        </div>
                    )}
                    {!article && !loading && (
                        <p>There was an error, please try with a valid link.</p>
                    )}
                    {article && (
                        content.map((string, index) => (
                            <Tweet key={index} data={article} content={string} avatar={avatar} index={index} />
                        ))
                    )}
                </div>
                <RightSidebar />
            </div>
        </>
    )
}