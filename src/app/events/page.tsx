import AlumniHero from '@/components/alumni-components/AlumniHero'
import { AllEvents } from '@/components/events-components/AllEvents';
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Suspense } from 'react'
import EventsLoading from '@/components/events-components/EventsLoading';

const EventsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-50">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20"> {/* Adjust pt-20 based on your header height */}
        <AlumniHero name='Events' />
        
        {/* Suspense for loading state */}
        <Suspense fallback={<EventsLoading />}>
          <AllEvents />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default EventsPage