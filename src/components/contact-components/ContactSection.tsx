"use client";

import {
  Cards,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Cards";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <div className="relative w-full bg-gray-100 py-10 px-4 space-y-10">
      {/* Info Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Cards className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <MapPin className="text-green-600" />
              Our Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>1842 Maple Avenue, Portland, Oregon 97204</p>
          </CardContent>
        </Cards>

        <Cards className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Mail className="text-green-600" />
              Email Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>info@example.com</p>
            <p>contact@example.com</p>
          </CardContent>
        </Cards>

        <Cards className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Clock className="text-green-600" />
              Hours of Operation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sunday–Fri: 9 AM – 6 PM</p>
            <p>Saturday: 9 AM – 4 PM</p>
          </CardContent>
        </Cards>
      </div>

      {/* Embedded Map */}
      <div className="max-w-6xl mx-auto">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7610164395996!2d-74.01040882417259!3d40.70979263827509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2028f2b50f%3A0xbaa32e477cbccc01!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1695417231255!5m2!1sen!2sus"
          width="100%"
          height="400"
          loading="lazy"
          allowFullScreen
          className="rounded-lg shadow-md border"
        ></iframe>
      </div>

      {/* Contact Form */}
      <ContactForm/>

    </div>
  );
}
