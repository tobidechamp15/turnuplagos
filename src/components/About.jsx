import React from "react";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import aboutExplore from "../assets/aboutExplore.svg";
import aboutBeyond from "../assets/aboutBeyond.svg";

const About = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center gap-3 mt-4 min-h-screen !container container-lg about-page xsm:px-3">
        <div className="xsm:text-[16px] text-white text-[64px] font-semibold flex flex-col  text-wrap text-center">
          <span>Where Every Day Feels Like a Party!</span>
        </div>
        <span className="text-[#FFFFFFB2] text-[12px] md:text-[24px] xsm:max-w-[] text-center">
          From epic events to must-visit hot spots, let’s turn up the vibe and
          explore Lagos like never before.
        </span>

        <div className="flex flex-col gap-3 mt-4">
          <span className="text-[24px] text-white">
            Explore Lagos Like Never Before!!!
          </span>
          <section className="flex about-wrapping flex-col md:flex-row gap-3">
            <img src={aboutExplore} alt="" className="obj" />
            <section className="flex flex-col md:max-w-[731px] text-white text-sm gap-3 justify-around">
              <span>
                We’re your ultimate go-to source for every social event,
                recreational activity, and memorable experience happening in
                Lagos. Whether you're a local or a visitor, we bring you the
                most comprehensive guide to everything Lagos has to offer. From
                electrifying concerts and thought-provoking art exhibitions to
                laid-back outdoor hangout spots and hidden foodie gems, we’ve
                got it all covered. Stay effortlessly updated on upcoming
                events, newly launched venues, exciting places to unwind, and
                exclusive happenings you won’t want to miss. With our help,
                you’ll never have to stay home unless you want to!
              </span>
              <span>
                Lagos is a vibrant cosmopolitan city bursting with life and
                energy. Picture yourself indulging in diverse and mouth-watering
                cuisines at local food markets, discovering contemporary art at
                world-class galleries, or simply lounging on stunning beaches
                with a refreshing cocktail in hand. The city is full of trendy
                hot spots, cultural hubs, and lively entertainment venues that
                truly capture the essence of Lagos' dynamic spirit. From secret
                rooftop bars to iconic nightlife spots, every corner of the city
                offers something new and exciting. We make it easy for you to
                navigate through the best experiences Lagos has to offer,
                ensuring you never miss out on the pulse of the city. Whether
                you’re looking for a casual night out or a weekend adventure,
                we’ve got you covered with all the latest event updates, venue
                openings, and things to do to make your time in Lagos
                unforgettable.
              </span>
            </section>
          </section>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <span className="text-[24px] text-white">
            Explore Lagos Like Never Before!!!
          </span>
          <section className="flex about-wrapping flex-col md:flex-row gap-3">
            <img src={aboutBeyond} alt="" className="obj" />
            <section className="flex flex-col md:max-w-[731px] text-white text-sm gap-3 justify-around">
              <span>
                Looking to expand your horizons and explore beyond Lagos? We’ve
                got you covered with the latest events, activities, and
                experiences happening in Abuja, Port Harcourt, Calabar, and
                beyond. Whether you’re a local resident or a curious traveler,
                we bring you the most up-to-date information on the diverse
                range of events happening across Nigeria's other vibrant cities.
                From the cultural richness of Abuja to the lively atmosphere of
                Port Harcourt and the scenic beauty of Calabar, each city offers
                unique experiences waiting to be discovered.
              </span>
              <span>
                Stay tuned for exciting updates on events hosted by Nigerian
                stars, influencers, and thought leaders, bringing you closer to
                the dynamic world of entertainment, fashion, and culture.
                Whether you're seeking to be part of a cultural renaissance in
                Port Harcourt, an artsy retreat in Calabar, or a groundbreaking
                event in Abuja, we provide all the details you need to
                experience the best of Nigerian life, both locally and
                internationally. Never miss out on the opportunity to be part of
                something special – with us, the best events in Nigerian states
                and beyond are just a tap away!
              </span>
            </section>
          </section>
        </div>

        <div className="flex flex-col gap-5 mt-4 text-white  container-md">
          <span className="text-[24px]">And the Best Part?</span>
          <span className="text-[16px] font-normal">
            All this information is absolutely FREE! Yes, you read that right.
            Plus, you can stay in the loop with our exclusive email updates.
            Sign up for our newsletter to be the first to know about can’t-miss
            events in Lagos and beyond.
          </span>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
