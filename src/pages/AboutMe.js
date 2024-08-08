import React from 'react';

const AboutMe = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px' }}>About Me</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Hello! I'm Adam Eltarzi, a passionate web developer with a love for creating engaging and user-friendly web experiences. With a strong background in front-end technologies and a keen eye for design, I enjoy bringing ideas to life through code.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        On the front end, I specialize in React and JavaScript, leveraging modern web development practices to build interactive and responsive applications. I strive to create seamless user experiences that delight and engage.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        On the backend, I use ASP.NET and C# to build robust and scalable server-side solutions. ASP.NET provides a powerful framework for developing high-performance web applications, while C# offers a versatile and efficient programming language for developing complex business logic and integrating with various services.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Together, these technologies allow me to create comprehensive and efficient web solutions that meet the needs of modern users and businesses.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Feel free to check out my portfolio to see some of my work and learn more about me:
      </p>
      <a 
        href="https://adam-eltarzi-portfolio.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'inline-block', fontSize: '1.2rem', color: '#1a73e8', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Visit my portfolio
      </a>
    </div>
  );
}

export default AboutMe;
