import React, { useContext, useEffect, useRef, useState } from 'react'
import ShadowCard from './ShadowCard'
import "./ViewBody.css"
import { FaFacebookF } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { BsWhatsapp, BsTwitter } from 'react-icons/bs'
import IconButton from '../../components/IconButton/IconButton'
import AboutView from './AboutView/AboutView'
import Footer from '../Footer/Footer'
import LifeView from './AboutView/LifeView'
import GalleryView from './GalleryView/GalleryView'
import StoryView from './StoryView/StoryView'
import TributeView from './TributeView/TributeView'
import { Link } from 'react-router-dom'
import { IoCopyOutline } from 'react-icons/io5'
import NameCircle from '../NameCircle/NameCircle'
import Copy from '../Copy'
import { Local_storage } from '../../utils/LocalStorageConfig'
import PostTributes from '../PostTributes'
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { AudioContext } from '../../contexts/AudioContext'
import Swal from 'sweetalert2'
import DialogClickout from '../DialogClickout'

function ViewBody({ activeTab, memorial }) {
  var host = window.location.protocol + "//" + window.location.host;

  const link_to_share = `${host}/memorial/${memorial.slug}`

  // useEffect(() => {
  //   console.log(memorial, 'memorialxx')

  // }, []);

  const [click, setClick] = useState(true);






  const handleClick = (event) => {
    const audio = event.target.children[0];
    audio.play();

  }

  const audioRef = useRef(null);
  // const { setaudioPause, setaudioPlayer } = useContext(AudioContext);

  const PlayAudio = () => {
    // console.log(audioRef.current);



    if (audioRef.current === null) {
      setClick(false)
    } else {
      audioRef.current.play();
      setClick(false)
    }
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  }



  useEffect(() => {
    // setaudioPlayer({ audioplay: audioRef.current });
  }, [])


  useEffect(() => {

    setClick(true)
    // PlayAudio()



    Swal.fire({
      // title: 'Are you sure?',
      text: "Play Memorial Song ?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        PlayAudio()
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })





  }, []);




  return (
    <div className='view_body_container'>
      <div className="home_max_width">
        <div className="view_body_body">
          <div className="memo_view_body_card_title">
            <NameCircle
              name={memorial?.user?.first_name?.charAt(0)?.toUpperCase() + memorial?.user?.first_name?.slice(1)?.toLowerCase()
                + " " +
                memorial?.user?.last_name?.charAt(0)?.toUpperCase() + memorial?.user?.last_name?.slice(1)?.toLowerCase()}
              role={memorial?.user?.role}
              date={memorial?.created_at}
            />
          </div>

          <div className="memo_view_body">

            <div className="memo_view_body_left">
              {
                activeTab === "About" ?
                  <AboutView fullname={memorial?.fullname} memo_id={memorial?.uuid} biography={memorial?.biography} memorial={memorial} />
                  :
                  activeTab === "Life" ?
                    <LifeView fullname={memorial?.fullname} memo_id={memorial?.uuid} life_history={memorial?.life_history} />
                    :
                    activeTab === "Gallery" ?
                      <GalleryView fullname={memorial?.fullname} memo_id={memorial?.uuid} gallery={memorial?.gallery} />
                      :
                      activeTab === "Stories" ?
                        <StoryView fullname={memorial?.fullname} memo_id={memorial?.uuid} story={memorial?.story} />
                        :
                        activeTab === "Tributes" ?
                          <TributeView fullname={memorial?.fullname} memo_id={memorial?.uuid} tributes={memorial?.tribute} />
                          :
                          null
              }
            </div>

            <div className="memo_view_body_right">
              <ShadowCard>
                <div className="memo_share">
                  Share Memorial
                </div>
                <div className="share_memo">
                  <span>Share memorial with {memorial?.fullname?.split(" ")[0]}’s family and friends</span>
                </div>
                <div className="social_icons_memo">
                  {/* <InstapaperShareButton url={link_to_share}>
                    <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<GrInstagram color='var(--main)' size={18} />} />
                  </InstapaperShareButton> */}
                  <WhatsappShareButton url={link_to_share}>
                    <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<BsWhatsapp color='var(--main)' size={18} />} />
                  </WhatsappShareButton>
                  <TwitterShareButton url={link_to_share}>
                    <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<BsTwitter color='var(--main)' size={18} />} />
                  </TwitterShareButton>
                  <FacebookShareButton url={link_to_share}>
                    <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<FaFacebookF color='var(--main)' size={18} />} />
                  </FacebookShareButton>
                </div>
                <div className="email_memo">
                  <Copy email={link_to_share} />
                </div>
              </ShadowCard>

              {
                memorial?.audio !== null ?
                  <ShadowCard>
                    <div className="memo_share">
                      Memorial Song
                    </div>
                    {/* <button id="playBtn" onClick={PlayAudio}  >Play</button>
                    <button id="playBtn" onClick={pauseAudio}  >Pause</button> */}
                    <div className="share_memo spotify-tag ">
                      <audio
                        className="clip"
                        id="Q"
                        src={memorial?.audio}
                        type="audio/mpeg"
                        ref={audioRef}
                        controls
                      ></audio>



                      {/* <button type="button" className="drum-pad" id="Heater-1">
                        play
                        <audio
                          className="clip"
                          id="Q"
                          src={memorial?.audio}
                          type="audio/mpeg"
                          ref={myRef}
                        ></audio>
                      </button> */}

                      {/* <audio loop controlsList='nodownload' autoPlay id="audioFromBE" src={memorial?.audio} controls /> */}
                      {/* <iframe src={memorial?.audio} allow="autoplay" controls  title='audioFromBE' id="audioFromBE">

                      </iframe> */}
                    </div>
                  </ShadowCard>
                  :
                  null
              }

              <ShadowCard>
                <div className="memo_view">
                  {memorial?.views_count} View(s)
                </div>
              </ShadowCard>
              <ShadowCard>
                <div style={{ padding: '20px' }}>
                  <div className="memo_created_by">
                    Created By
                  </div>
                  <div className="memo_created_name">
                    {memorial?.user?.first_name?.charAt(0)?.toUpperCase() + memorial?.user?.first_name?.slice(1)?.toLowerCase()
                      + " " +
                      memorial?.user?.last_name?.charAt(0)?.toUpperCase() + memorial?.user?.last_name?.slice(1)?.toLowerCase()}
                  </div>
                </div>
              </ShadowCard>
            </div>
          </div>

          <div className="showMobile">
            <div className="about_memo_con">
              <div className="about_title">
                Post a tribute
              </div>


              <div className='login_link'>
                {
                  Local_storage().get("_utk") !== '' ?
                    <PostTributes memo_id={memorial?.uuid} />
                    :
                    <>
                      <Link to="/login">Log in</Link> to post a tribute for {memorial?.fullname}
                    </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* <DialogClickout
        open={click}

      >


        <div className='audio_enable' >
          <div>
            <h1 className='aud_enb' >Play Memorial Song</h1>
          </div>

          <div>
            <button className='aud_btn' onClick={PlayAudio} >Ok</button>
          </div>


        </div>

      </DialogClickout> */}

    </div>
  )
}

export default ViewBody


