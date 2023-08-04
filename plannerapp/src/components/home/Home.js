import React, { useEffect } from 'react'
import $ from 'jquery'
import'../../static/components/home/home.css'
import { useDispatch, useSelector } from 'react-redux';
import { allTodosServer, allMonthlyServer } from '../../reduxComps/actions/Index'
import All from '../all/All';
import Monthly from '../monthly/Monthly';
import Todos from '../todos/Home'
import { RiAccountCircleLine } from "react-icons/ri";
import { SiMastodon } from "react-icons/si";
import { getUser } from '../../utils/token';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch()
  let userId = getUser();

  useEffect(() => {
    // console.log(userId)
    userId && axios.post('/allTodos', {
      userId: userId.userId
    })
    .then((res) => {
      // console.log("res is", res.data)
      dispatch(allTodosServer(res.data))
      })
    .catch((err) => console.log("Err", err))
  }, [userId]);

  useEffect(  () => {
    (async () => {
      userId && axios.post('/allMonthlyPlans', {
        userId: userId.userId
      })
      .then( async (res) => {
        console.log("res is", res.data)
        await dispatch(allMonthlyServer(res.data))
        })
      .catch((err) => console.log("Err", err))
    })()
    
  }, [userId]);
  
  $(document).ready(function(){
    $('#menu button').click(function(){
      var hrefId = $(this).attr('href');
      var classname = this.className;
      $('.div_screen_contents_frame .page').hide();
      $('.div_screen_contents_frame').find(hrefId).show();
      $('.home_btn').removeClass('activeNew').addClass('inactive');
     $(this).removeClass('inactive').addClass('activeNew');
    });
  });

  return (
    <div className="home">
      <div className='home_btns'>
        <div id="menu">
          <Link className="home_account home_logo" to='/'><SiMastodon /></Link>
          <button className="home_btn inactive all_btn activeNew" href="#p1">ALL</button>
          <p>|</p>
          <button className="home_btn inactive" href="#p2">Todos</button>
          <p>|</p>
          <button className="home_btn inactive" href="#p3">Monthly Plans</button>
          <a className="home_account"><span>{getUser() ? <span className='user_name'>Hi, {getUser().name}</span> : <Link to='/SignIn'><RiAccountCircleLine /></Link>}</span></a>
      </div>
      </div>
      
      <div className="div_screen_contents_frame">
        <div className="page active" id="p1">
          <section className="icon fa fa-bolt">
            <All />
          </section>  
        </div>
        <div className="page" id="p2">
          <section className="icon fa fa-bolt">
            <Todos />  
          </section>  
        </div>
        <div className="page" id="p3">
          <section className="icon fa fa-bolt">
          <Monthly />
          </section>  
        </div>
    </div>
    </div>
  )
}

export default Home