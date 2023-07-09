import classNames from "classnames/bind";
import styles from './tags.module.scss';
import { Link } from "react-router-dom";
import { getTag } from "../../APIs/default";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)
function Tags() {
    const [tags,setTags] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const fechData = async ()=>{
            setLoading(true)
            try {
                const response = await getTag();
                setTags(response.tags)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fechData()
    },[])
    return (
        <>
            <div className={cx('box-tags')}>
                <div className={cx('content-tags')}>
                    <p>Popular Tags</p>
                    {loading ? (
                        <p>Loading...</p>
                    ):(
                        <div className={cx('')}>
                            {tags.map((tag,index)=>(
                            <Link key={index} className={cx('hastag')}>{tag}</Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tags;