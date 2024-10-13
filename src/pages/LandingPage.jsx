import { Button } from "@/component/ui/button.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/component/ui/carousel.jsx";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import faqs from "../data/faq.json";
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/component/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 ">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter">
          Find Your Dream job{" "}
          <span className="flex items-center gap-2 sm:gap-6 ">
            and Get Placeist
          </span>
        </h1>
        <p className="text-gray-400 sm:mt-4 text-xs sm:text-xl ">
          Just like a lighthouseyou guides ships to safe shores ,Placeist illuminates the path for job seekers and employers,helping them find the perfect match amidst the vast ocean of opportunities.
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find jobs
          </Button>
        </Link>
        <Link to="post-jobs">
          <Button variant="destructive" size="xl">
            {" "}
            Post jobs
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({ // fpr scroll the logos 
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  className="h-9 sm:h-14 object-contain"
                  alt={name}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* our banner */}


      <img src='/Banner.png' className="w-full" />
      

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
            <CardContent>
              <p>Search and Apply for jobs, track applications,and more.</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
            <CardContent>
              <p>Post jobs,manage aplications,and find the best candidates</p>
            </CardContent>
          </CardHeader>
        </Card>
      </section>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-1${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;
