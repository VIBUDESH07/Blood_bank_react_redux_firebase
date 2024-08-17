import React, { useState } from "react";
import "./Front.css";

const Front = () => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzFPVGxI-75Ilkm2z_EMuI9ubPlp8-7dQmMzzdPiIunLPPzj3bcY1ohMdT_DfZ3zPwhTA/exec';
    const form = new FormData(e.target);

    fetch(scriptURL, { method: 'POST', body: form })
      .then(response => {
        setMsg("Message sent successfully");
        setTimeout(() => setMsg(""), 5000);
        e.target.reset();
      })
      .catch(error => console.error('Error!', error.message));
  };

  return (
    <div>
 

      <section className="home" id="home">
        <div className="home-content">
          <br /><br /><br />
          <h3>Welcome to</h3>
          <h1>Our Blood Bank</h1>
          <h3>Your <span className="multiple-text">Life-Saving Partner</span></h3>
          <div className="social-media">
            <a href="#"><i className='bx bxl-facebook'></i></a>
            <a href="#"><i className='bx bxl-twitter'></i></a>
            <a href="#"><i className='bx bxl-instagram'></i></a>
          </div>
          <a href="#" className="btn">Learn More</a>
        </div>
        <div className="home-img">
          <br /><br /><br /><br />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKFmw0tyMsWJBPYHg6yaGZdGVuymO2SOZ_w&s" alt="Blood Donation" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-img">
          <center>
            <img src="https://www.pngkey.com/png/full/366-3668299_world-blood-donors-day-transparent-blood-donor-clipart.png" alt="About Us" />
          </center>
        </div>
        <div className="about-content">
          <h2 className="heading">About<span>Us</span></h2>
          <h3>Dedicated to Saving Lives</h3>
          <p>Welcome to Our blood bank, a vital lifeline in the community where saving lives is our mission. We are a dedicated and compassionate team committed to ensuring a safe and reliable supply of blood for those in need. Our blood bank serves as a crucial resource, providing life-saving blood products to hospitals and medical facilities across the region.</p>
          <h3>Our Mission</h3>
          <p>At our Blood bank, our mission is to connect generous blood donors with those whose lives depend on it. We strive to maintain the highest standards of safety, efficiency, and care in every step of the blood donation and distribution process. Through innovation and community engagement, we aim to inspire more people to become regular blood donors, ensuring that no one in need of a blood transfusion has to wait.</p>
          <a href="#" className="btn">Read More</a>
        </div>
      </section>

      <section className="services" id="services">
        <h2 className="heading">Our<span>Services</span></h2>
        <div className="services-container">
          <div className="services-box">
            <i className='bx bx-heart'></i>
            <h3>Blood Donation</h3>
            <p>Join our community of life-savers by donating blood. Your contribution can help save lives in emergency situations.</p>
            <a href="#" className="btn">Learn More</a>
          </div>
          <div className="services-box">
            <i className='bx bx-search'></i>
            <h3>Blood Availability Check</h3>
            <p>Easily check the availability of blood types in our blood bank, ensuring timely access when it's needed the most.</p>
            <a href="#" className="btn">Learn More</a>
          </div>
          <div className="services-box">
            <i className='bx bx-building-house'></i>
            <h3>Blood Donation Camps</h3>
            <p>We organize blood donation camps across various locations to make donating blood convenient and accessible.</p>
            <a href="#" className="btn">Learn More</a>
          </div>
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <h2 className="heading">Our<span>Achievements</span></h2>
        <div className="portfolio-container">
          <div className="portfolio-box">
            <img src="https://nscri.in/admin_assets/img/service/blood_bank-min_(4).jpg" alt="1 Million Donations" />
            <div className="portfolio-layer">
              <h4>1 Million Donations</h4>
              <p>We reached a milestone of 1 million blood donations, helping countless patients in critical need.</p>
              <a href="#"><i className='bx bx-link-external'></i></a>
            </div>
          </div>
          <div className="portfolio-box">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdhzC49YbPXDFxaZId8cmSuZyyJGnxWToAQ&s" alt="Advanced Screening Techniques" />
            <div className="portfolio-layer">
              <h4>Advanced Screening Techniques</h4>
              <p>Implemented state-of-the-art blood screening processes to ensure the highest quality of blood supply.</p>
              <a href="#"><i className='bx bx-link-external'></i></a>
            </div>
          </div>
          <div className="portfolio-box">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJNuU6lcngQWvLmy59yqeC7fDCy0-1MFi6g&s" alt="Community Impact Award" />
            <div className="portfolio-layer">
              <h4>Community Impact Award</h4>
              <p>Received recognition for our impact on the local community through our regular blood donation drives and awareness programs.</p>
              <a href="#"><i className='bx bx-link-external'></i></a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="heading">Contact<span>Us</span></h2>
        <form onSubmit={handleSubmit} name="submit-to-google-sheet">
          <div className="input-box">
            <input type="text" name="Name" placeholder="Full Name" />
            <input type="email" name="Email Address" placeholder="Email Address" />
          </div>
          <div className="input-box">
            <input type="text" name="Mobile Number" placeholder="Mobile Number" />
            <input type="text" name="Email Subject" placeholder="Email Subject" />
          </div>
          <textarea name="Your Message" cols="30" rows="10" placeholder="Your Message"></textarea>
          <input type="submit" value="Send Message" className="btn" />
        </form>
        <span id="msg">{msg}</span>
      </section>

      <footer className="footer">
        <div className="footer-text">
          <p>Copyright &copy; 2024 by Blood Bank | All Rights Reserved.</p>
        </div>
        <div className="footer-iconTop">
          <a href="#home"><i className='bx bx-up-arrow-alt'></i></a>
        </div>
      </footer>
    </div>
  );
};

export default Front;
