import { useEffect, useState } from 'react'
import { reviews as initialReviews, type Review } from './data/reviews'
import Lenis from 'lenis'
import HeroSection from './components/sections/HeroSection'
import Navigation from './components/layout/Navigation'
import MenuPreview from './components/sections/MenuPreview'
import MenuGrid from './components/sections/MenuGrid'
import Locations from './components/sections/Locations'
import Footer from './components/layout/Footer'
import Reviews from './components/sections/Reviews'
import GallerySection from './components/sections/GallerySection'
import OrderingPortal from './components/ui/OrderingPortal'
import ReviewsPage from './components/pages/ReviewsPage'
import GalleryPage from './components/pages/GalleryPage'
import WriteReviewModal from './components/ui/WriteReviewModal'

function App() {
  const [isOrderingOpen, setIsOrderingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [currentView, setCurrentView] = useState<'home' | 'reviews' | 'gallery'>('home');

  const handleAddReview = (data: { name: string; rating: number; text: string; image: File | null }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      author: data.name,
      rating: data.rating,
      text: data.text,
      date: 'Just now',
      platform: 'google',
      image: data.image ? URL.createObjectURL(data.image) : undefined
    };
    setReviews([newReview, ...reviews]);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-espresso text-alabaster selection:bg-terracotta selection:text-white">
      <Navigation
        onOpenOrder={() => setIsOrderingOpen(true)}
        onNavigate={setCurrentView}
      />

      {currentView === 'home' ? (
        <>
          <HeroSection onOpenOrder={() => setIsOrderingOpen(true)} />
          <MenuPreview />
          <MenuGrid onOpenOrder={() => setIsOrderingOpen(true)} />
          <GallerySection onViewGallery={() => {
            setCurrentView('gallery');
            window.scrollTo(0, 0);
          }} />
          <Locations />
          <Reviews
            reviews={reviews}
            limit={6}
            onOpenReview={() => setIsReviewOpen(true)}
            onViewAll={() => {
              setCurrentView('reviews');
              window.scrollTo(0, 0);
            }}
          />
        </>
      ) : currentView === 'reviews' ? (
        <ReviewsPage
          reviews={reviews}
          onOpenReview={() => setIsReviewOpen(true)}
        />
      ) : (
        <GalleryPage />
      )}
      <Footer />

      {/* The Portal */}
      <OrderingPortal
        isOpen={isOrderingOpen}
        onClose={() => setIsOrderingOpen(false)}
      />

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleAddReview}
      />
    </main>
  )
}

export default App
