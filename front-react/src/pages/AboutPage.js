import React, { useState, useEffect } from "react";
import axios from 'axios';
import './pages_css/AboutPage.css';  

const AboutPage = () => {
    const [features, setFeatures] = useState([]);
    
    useEffect(() => {
      const fetchFeatures = async () => {
        try {
          const response = await axios.get("/admin/features"); 
          setFeatures(response.data);
        } catch (error) {
          console.error("Error fetching features:", error);
        }
      };
  
      fetchFeatures();
    }, []);

    return (
        <div className="about-page-container">
        <div className="about-page">
            <div className="left-section">
                <p>Focal Point</p>
                <h1>Every book, every page, every journey right at your fingertips.</h1>
                <div className="buttons">
                <a href="./login" class="login-button">Sign-in</a> 
                <a href="./register" class="registerbtn">Sign-up</a>
                </div>
            </div>
            <div className="right-section">
                <div className="column">
                    <div className="image-container"></div>
                    <img className="placeholder-image" src="https://m.media-amazon.com/images/I/71nFWJNotiL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder 2" />
                    <img className="placeholder-image" src="https://images.squarespace-cdn.com/content/v1/5c9a5795797f743ca34be7c6/1663965720023-QYLB9O673FMZ5FT31P4H/Both+Can+Be+True.jpeg" alt="Placeholder 3" /> 
                    <img className="placeholder-image" src="https://m.media-amazon.com/images/I/71yjOCTmPfL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder 3" /> 
                </div>
                <div className="column">
                    <div className="placeholder-image-bottom"></div>
                    <img className="placeholder-image" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631226405i/58959950.jpg" alt="Placeholder 4" /> 
                    <img className="placeholder-image" src="https://m.media-amazon.com/images/I/71St3wEtpWL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder 5" />
                </div> 
                <div className="column">
                    <img className="placeholder-image" src="https://mpd-biblio-covers.imgix.net/9781250751386.jpg?w=300" alt="Placeholder 6" /> 
                    <img className="placeholder-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAQ2BH0v7zr-o6alfutqrbDf47xGaYJ9Iw002E28nGw&s" alt="Placeholder 7" /> 
                    <img className="placeholder-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDekkDvsDg6dMg7DUjGPpy9PqAM34wcuTehRPDWNiJqw&s" alt="Placeholder 8" />
                </div> 
                <div className="column"> 
                    <div className="image-container-2"></div>
                    <img className="placeholder-image" src="https://m.media-amazon.com/images/I/71XVonyB0kL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder 11" /> 
                    <img className="placeholder-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UOxJt8vcjHQAmIpsg8DOiNXDxGxqkIaLqSks8Qgl-A&s" alt="Placeholder 12" /> 
                    <img className="placeholder-image" src="https://m.media-amazon.com/images/I/71yjOCTmPfL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder 13" />
                </div>
                <div className="new-column">
                    <div className="image-container-3"></div>
                    <img className="placeholder-image-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBpgIPRfs56rRSRnzko7auAV8iQCdMAQMYXQ&s" alt="Placeholder 17" />
                    <img className="placeholder-image-2" src="https://alastore.ala.org/sites/default/files/styles/imagezoom_gallery_image/public/book_covers/BannedBooks_Sourcebooks_1200.jpg?itok=uk0WosMa" alt="Placeholder 18" />
                    <img className="placeholder-image-2" src="https://mpd-biblio-covers.imgix.net/9780374719678.jpg?w=300" alt="Placeholder 19" />
                    <img className="placeholder-image-2" src="https://shop.merriam-webster.com/cdn/shop/products/Britannica-Baby-Encyclopedia-cover.jpg?v=1667239352&width=533" alt="Placeholder 20" />
                </div>  
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
      </div>
    );
}

export default AboutPage;