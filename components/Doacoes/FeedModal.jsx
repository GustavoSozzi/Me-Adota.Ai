import React, {useEffect} from 'react'
import styles from './FeedModal.module.css'
import useFetch from '../../hooks/useFetch'
import Error from '../../hooks/helper/Error'
import Loading from '../Feed/Account/Loading'
import { ANIMAIS_GET } from '../../data/api'
import PhotoContent from '../photo/PhotoContent'
 

const FeedModal = ({photo, setModalPhoto}) => {
  const {data, error, loading, request} = useFetch()

  useEffect(() => {
    const {url, options} = ANIMAIS_GET(photo.id)
    request(url, options)
  }, [photo, request]);

  function handleOutsideClick(event){
    if(event.target === event.currentTarget) setModalPhoto(null); 
  }
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error erro={error}/>}
      {loading && <Loading/>}
      {data && <PhotoContent data={data}/>}
    </div>
  )
}

export default FeedModal
