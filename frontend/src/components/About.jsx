const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About This Project</h1>

      <p style={styles.text}>
        This website is a <strong>project-based application</strong> developed
        for learning and demonstration purposes. The content, features, and
        data presented here are intended to showcase web development concepts
        such as UI design, API integration, and full-stack application flow.
      </p>

      <p style={styles.text}>
        Please note that this platform is <strong>not a commercial service</strong>.
        Any packages, prices, or destinations shown are for educational use only
        and should not be considered as real travel offerings.
      </p>

      <p style={styles.text}>
        The goal of this project is to build a clean, responsive, and user-friendly
        interface while following best practices in modern web development.
      </p>

      <div style={styles.authorBox}>
        <h2 style={styles.subtitle}>Author</h2>
        <p style={styles.text}>
          Developed by <strong>Thirumulanathan V</strong>, a Full Stack Developer
          with interests in backend engineering, system design, and scalable
          web applications.
        </p>

        <p style={styles.links}>
          GitHub:&nbsp;
          <a
            href="https://github.com/THIRUMULANATHAN"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/THIRUMULANATHAN
          </a>
        </p>

        <p style={styles.links}>
          LinkedIn:&nbsp;
          <a
            href="https://www.linkedin.com/in/thirumulanathan"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/thirumulanathan
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "120px auto",
    padding: "30px",
    fontFamily: "Roboto, sans-serif",
    color: "#333",
    lineHeight: "1.7",
  },
  title: {
    fontFamily: "Playfair Display, serif",
    fontSize: "2.5rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.05rem",
    marginBottom: "15px",
  },
  authorBox: {
    marginTop: "40px",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "15px",
    backgroundColor: "#fafafa",
  },
  links: {
    fontSize: "1rem",
    marginTop: "8px",
  },
};

export default About;
