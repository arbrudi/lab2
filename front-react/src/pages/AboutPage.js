import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import './pages_css/AboutPage.css';  

const AboutPage = () => {
    const [features, setFeatures] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const user = localStorage.getItem("userToken");
    const admin = localStorage.getItem("adminToken");

    useEffect(() => {

      const fetchFeatures = async () => {
        try {
          const response = await axios.get("/admin/features"); 
          setFeatures(response.data);
        } catch (error) {
          console.error("Error fetching features:", error);
        }
      };

      const fetchSponsors = async() => {
        try{
          const resp = await axios.get("admin/sponsors");
          setSponsors(resp.data);
        }catch (error) {
          console.error("Error fetching features:", error);
        }
      };
  
      fetchFeatures();
      fetchSponsors();
    }, []);

    return (
        <div className="about-page-container">
        <div className="about-page">
            <div className="left-section">
                <p>Focal Point</p>
                <p>Every book, every page, every journey right at your fingertips.</p>
                <div className="buttons">
                {(!user  && !admin ) && <a href="./login" class="login-button">Sign-in</a> }
                {(!user  && !admin) && <a href="./register" class="registerbtn">Sign-up</a> }
                {(user || admin)&& <button className="link-to-books"><Link to="/books">Discover our library!</Link></button>}
                
                </div>
            </div>
            <div className="right-section">
                <img src='https://www.thestorygraph.com/assets/hero-image-9daf4eae0b6f8e9beb51f83fd4a99631698ca1c8c68ef07a1aae37ef8a477dd1.jpg'/>
            </div>  
        </div>  
        <div className="second-section">
    <div className="secondl">
        <div className="rec">
            <div className="recommandations">Recommandations</div> 
            <div className="preferences">Preferences</div>
        </div> 
        <div className="rec2">What are you in the mood for?</div> 
        <div className="items">
            <div className="items-2">
               
            <img className="book" src="https://images.penguinrandomhouse.com/cover/9780593448885" alt="Placeholder 2" /> 
                    <div className="books">
            <div className="book-title">The Limits</div>
              <div className="book-author">Nell Fraudenberg</div>  
              <div className="genre">
                <div className="g1">nonfiction</div> 
                <div className="g1">historical</div>
                <div className="g1">literary</div> 
                <div className="g1">race</div>
              </div> 
              </div><div className="read">
                <div className="read1">
                  <div className="read2">to read</div>
                    <div className="read3"> ↓</div>
                </div>
                <div className="next">add to up next</div>
              </div>
            </div>  
        </div> 
        <div className="items">
        <div className="items-2">
               
               <img className="book" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStE_d9TMMUwJpL3YVqnRLkMSf_FncjAyx2N6flBM4f9UxfaZSvws5uyQP_z35lBx28ks&usqp=CAU" alt="Placeholder 2" /> 
               <div className="books">
       <div className="book-title"> Tiny Beautiful Things</div>
         <div className="book-author">Cheryl Strayed</div>  
         <div className="genre">
           <div className="g1">nonfiction</div> 
           <div className="g1">historical</div>
           <div className="g1">literary</div> 
           <div className="g1">race</div>
         </div> 
         </div><div className="read">
           <div className="read1">
             <div className="read20">to read</div>
               <div className="read3"> ↓</div>
           </div>
           <div className="next">add to up next</div>
         </div>
       </div>  
        </div>
    </div>  
    <div className="secondr"> 
        <div className="secondr-container">
          <img className="icon" src="https://i.pinimg.com/736x/b2/38/01/b238018c0a4861898f3f44f78ce3eb2c.jpg" alt="icon"/>
            <div className="right-title">Discover Your Next Favorite Book</div> 
            <div className="right-description">Focal Point's AI-powered recommendation system analyzes your unique tastes and reading habits to deliver spot-on book suggestions. Whether you're into thrilling mysteries, heartfelt romances, or enlightening non-fiction, the perfect read is always within reach.</div>
        </div>
    </div>
</div>
        <div className="third-section"> 
          <div className="title">Focal is the all-in-one platform for your bookish needs.</div>
          {features.map((feature) => (
            <div key={feature._id} className="feature-item">
              <img className="icon-placeholder" src={feature.icon} alt="Feature Icon" />
              <div className="name-placeholder"><p>{feature.name}</p></div>
              <div className="description-placeholder"><p>{feature.description}</p></div>
              
            </div>
          ))}
        </div> 

        <div className="sponsor-title">Meet our sponsors</div>
        <div className="sponsor-section"> 
          {sponsors.map((sponsor) => (
            <div key={sponsor._id} className="sponsor-item">
              <img className="logo-placeholder" src={sponsor.Logo} alt="Sponsor logo" />
              <div className="sponsor-name-placeholder"><p>{sponsor.Sponsor_name}</p></div>
            </div>
          ))}
        </div> 
      </div>
    );
}

export default AboutPage;