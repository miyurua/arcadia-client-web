import React from "react";

const About = () => {
  return (
    <div className="font-spacemono max-w-4xl mx-auto flex flex-col gap-6 p-3 ">
      <h1 className="text-3xl font-bold my-7">Arcadia</h1>
      <p className="text-slate-700">
        Arcadia is built by{" "}
        <a
          className="text-blue-700 font-semibold"
          href={"https://miuru.netlify.app/"}
        >
          Miuru Abeysiriwardana
        </a>{" "}
        on a robust and modern tech stack to ensure a seamless and dynamic user
        experience. The foundation of our platform is the MERN stack, comprising
        MongoDB, Express.js, React, and Node.js. This combination provides a
        highly scalable and efficient framework for both front-end and back-end
        development. Using TypeScript enhances our code quality and
        maintainability by adding static type definitions, allowing us to catch
        errors early in the development process and improve overall code
        reliability.
      </p>
      <p className="text-slate-700">
        To manage state and streamline complex application logic, we utilize
        Redux. Redux allows us to maintain a predictable state container, making
        it easier to manage and debug the application state across various
        components. For our authentication system, we implement Firebase Auth
        with JWT tokens. This ensures secure and efficient user authentication
        and authorization processes, providing our users with a safe and
        trustworthy environment. Additionally, Firebase Storage is used for
        storing and serving user-generated content, such as game screenshots and
        user avatars, ensuring fast and reliable access to media assets.
      </p>
      <p className="text-slate-700">
        Our blog is designed to deliver high-quality content and is created
        separately using Contentful, a headless CMS. This allows us to manage
        and publish content with ease, offering flexibility and scalability.
        Contentful’s powerful API integrates seamlessly with our website,
        enabling us to deliver dynamic and engaging content to our users. By
        leveraging this modern tech stack, Arcadia aims to provide an
        unparalleled gaming experience, ensuring high performance, security, and
        scalability for all our users.
      </p>
    </div>
  );
};

export default About;
