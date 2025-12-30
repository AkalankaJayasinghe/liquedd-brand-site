import './About.css';

const About = () => {
  const values = [
    {
      icon: "🌿",
      title: "Natural Quality",
      description: "We source only the finest natural ingredients to create beverages that are both delicious and healthy."
    },
    {
      icon: "🎯",
      title: "Innovation",
      description: "Constantly pushing boundaries to create unique flavors and experiences that surprise and delight our customers."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building lasting relationships with our customers, suppliers, and local communities we serve."
    },
    {
      icon: "♻️",
      title: "Sustainability",
      description: "Committed to environmental responsibility through eco-friendly packaging and sustainable practices."
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded by passionate beverage enthusiasts with a vision to create premium drinks."
    },
    {
      year: "2019",
      title: "First Products",
      description: "Launched our first line of natural fruit juices and sparkling waters."
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Expanded our product range to include energy drinks and specialty beverages."
    },
    {
      year: "2023",
      title: "Going Digital",
      description: "Launched our online platform to reach customers nationwide."
    },
    {
      year: "2025",
      title: "Innovation Focus",
      description: "Continuing to innovate with new flavors and sustainable packaging solutions."
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Liquedd</h1>
            <p className="hero-tagline">Crafting Premium Beverages Since 2018</p>
            <p className="hero-description">
              We believe that great beverages bring people together. Our mission is to create 
              exceptional drinks that not only taste amazing but also contribute to a healthier, 
              more sustainable world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story section">
        <div className="container">
          <div className="story-content grid grid-2">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Liquedd was born from a simple idea: why settle for ordinary when you can have 
                extraordinary? Our founders, Alex and Sarah, were frustrated with the lack of 
                truly premium, natural beverage options in the market.
              </p>
              <p>
                Starting in a small kitchen in 2018, they began experimenting with natural 
                ingredients, unique flavor combinations, and sustainable packaging. What started 
                as a weekend hobby quickly grew into a passion project, and then into the 
                thriving business you see today.
              </p>
              <p>
                Today, Liquedd is proud to serve customers across the country with our carefully 
                crafted beverages. Every bottle tells a story of quality, innovation, and our 
                commitment to excellence.
              </p>
            </div>
            <div className="story-image">
              <img src="/api/placeholder/500/400" alt="Our founders working in the original kitchen" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision section">
        <div className="container">
          <div className="mv-grid grid grid-2">
            <div className="mission-card card">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To create premium, natural beverages that enhance life's special moments while 
                promoting health, sustainability, and community connection. We strive to exceed 
                expectations in every sip.
              </p>
            </div>
            <div className="vision-card card">
              <div className="mv-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>
                To become the world's most trusted premium beverage brand, known for our 
                unwavering commitment to quality, innovation, and environmental stewardship, 
                while inspiring healthier lifestyle choices globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          
          <div className="values-grid grid grid-4">
            {values.map((value, index) => (
              <div key={index} className="value-card card">
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our company's evolution</p>
          </div>
          
          <div className="timeline-container">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team section">
        <div className="container">
          <div className="section-header">
            <h2>Leadership Team</h2>
            <p>The passionate individuals driving our mission forward</p>
          </div>
          
          <div className="team-grid grid grid-3">
            <div className="team-member card">
              <div className="member-image">
                <img src="/api/placeholder/200/200" alt="Alex Johnson" />
              </div>
              <div className="member-info">
                <h4>Alex Johnson</h4>
                <p className="member-role">Co-Founder & CEO</p>
                <p>Passionate about innovation and quality, Alex leads our product development and strategic vision.</p>
              </div>
            </div>
            
            <div className="team-member card">
              <div className="member-image">
                <img src="/api/placeholder/200/200" alt="Sarah Chen" />
              </div>
              <div className="member-info">
                <h4>Sarah Chen</h4>
                <p className="member-role">Co-Founder & CTO</p>
                <p>With a background in food science, Sarah ensures every product meets our highest standards.</p>
              </div>
            </div>
            
            <div className="team-member card">
              <div className="member-image">
                <img src="/api/placeholder/200/200" alt="Mike Rodriguez" />
              </div>
              <div className="member-info">
                <h4>Mike Rodriguez</h4>
                <p className="member-role">Head of Operations</p>
                <p>Mike oversees our production and supply chain, ensuring quality and efficiency at every step.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Journey</h2>
            <p>
              Experience the difference that passion, quality, and innovation make. 
              Try our premium beverages today.
            </p>
            <a href="/products" className="btn btn-primary">
              Explore Our Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;