import React from "react";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="flex flex-col gap-3 mt-4 min-h-screen container-md about-page p-0">
      <article className="text-base text-white leading-relaxed">
        When you’re thinking of things to do after a hard day at work or during
        the weekend, you would probably phone a friend for suggestions, right?
        But as we all know, friends may not know every social event or
        recreational activity going on – That’s where <strong>WE</strong> come
        in!
      </article>

      <map className="text-3xl text-white xsm:text-[24px]">
        If you want to <map className="text-[#FFDE00]">Explore Lagos</map>
      </map>

      <article className="text-base text-white leading-relaxed">
        We hunt for every social event or recreational activity happening in the
        city of Lagos and make all that information available to{" "}
        <strong>YOU</strong> in one place. We keep informing you about upcoming
        events and newly launched outdoor hangout spots, providing you with so
        many options that you’ll never have to stay at home if you don’t want
        to. Lagos is a cosmopolitan city bursting with diverse cultures,
        mouthwatering cuisine, long beaches, and a plethora of trendy venues for
        you to explore.
      </article>

      <map className="text-3xl text-white xsm:text-[24px] ">
        If you prepared to go
        <map className="text-[#FFDE00]"> Beyond Lagos</map>
      </map>

      <article className="text-base text-white leading-relaxed">
        We also provide information on events and recreational hot spots in
        Abuja, Port Harcourt, and Calabar. And we don’t stop there – we also
        give you the heads up on events by Nigerian personalities abroad,
        notably in the US, Europe, and South Africa.
      </article>

      <article className="text-base text-white leading-relaxed">
        Oh, and we almost forgot to mention that all the information we provide
        to you is absolutely <strong>FREE!</strong> If you would like to receive
        emails on exclusive events coming soon in Lagos, click here to sign up
        for our free newsletter.
      </article>

      <article className="text-base text-white leading-relaxed">
        So whether you want to know where to swim, where to eat local or
        continental food, where to attend a motivational seminar, where to do
        karaoke, where to learn to dance Salsa, or where to attend a music
        concert, we hope you keep visiting so we can show you where to Turn Up!
      </article>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
