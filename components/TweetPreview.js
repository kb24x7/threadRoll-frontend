import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AvatarGenerator } from 'random-avatar-generator';
import Image from 'next/image'
import verified from '../images/icons/verified.svg'
import styles from '../styles/TweetPreview.module.scss'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useRouter } from 'next/router'
import reply from '../images/icons/tweet/reply.svg'
import like from '../images/icons/tweet/like.svg'
import retweet from '../images/icons/tweet/retweet.svg'
import share from '../images/icons/tweet/share.svg'

export const TweetPreview = ({ data, index }) => {
    const [date, setDate] = useState()
    const router = useRouter();
    const icons = [reply, retweet, like, share];
    const generator = new AvatarGenerator();
    const { user } = useAuth0()

    useEffect(() => {
        TimeAgo.addLocale(en)
        const timeAgo = new TimeAgo('en-US')
        if (data.published) {
            setDate(timeAgo.format(new Date(data.published), 'twitter'))
        }
    }, [])

    const handleIconClick = (index) => {
        if (index === 2 && user) {
            console.log(user)
            // Save the article to the user's profile
        } else if (index === 3) {
            console.log('Share!')
            // Share popup
        }
    }

    return (
        <div className={styles.parent} onClick={() => router.push(`article?url=${data.url}`)}>
            <img key={index} src={generator.generateRandomAvatar()} alt="Profile Picture" className={styles.profile}></img>
            <div className={styles.content}>
                <div className={styles.publishing}>
                    <p className={styles.author}>{data.author ? data.author : 'Unknown'}</p>
                    {data.author && (
                        <div className={styles.verified}>
                            <Image src={verified}></Image>
                        </div>
                    )}
                    <p className={styles.source}>@{data.source ? data.source.toLowerCase().replace(/\s/g, "")  : 'Unknown'}</p>
                    <p className={styles.date}>• {date ? date : 'Unknown'}</p>
                    
                </div>
                <p className={styles.title}>{data.title}</p>
                <img src={data.image} alt="" className={styles.cover} />
                <div className={styles.buttons}>
                    {icons.map((icon, index) => (
                        <div key={index} className={(index === 0 || index === 1) ? styles.iconParentNoHover : styles.iconParent}>
                            <div className={styles.icon}>
                                <Image src={icon} onClick={() => handleIconClick(index)}></Image>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}