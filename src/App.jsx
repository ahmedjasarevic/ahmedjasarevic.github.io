import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components";

const App = () => {
  useEffect(() => {
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(({ createChat }) => {
        createChat({
          webhookUrl: 'https://n8n-62tp.onrender.com/webhook/e137dfbb-3366-4952-a287-dfa789ff6bbf/chat',
          initialMessages: [
            "Hello! 👋",
            "My name is Ahmed. How can I help you today?"
          ]
        });
      });
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
