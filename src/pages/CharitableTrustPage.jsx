import React, { useState } from 'react';
import PageHero from '../components/common/PageHero';
import { Heart, CheckCircle, Gift, Users, Award, Send, Sparkles, ShieldCheck } from 'lucide-react';

const CharitableTrustPage = () => {
  const [donationAmount, setDonationAmount] = useState('2500');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donated, setDonated] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    setDonated(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-12">
      <PageHero
        title="DermaLuxe Healthy Skin & Pediatric Dermatology Foundation"
        subtitle="Empowering underprivileged children with free hemangioma, eczema treatments, vitiligo phototherapy, and community skin health camps."
        breadcrumb={[{ label: 'Charitable Trust' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* About Trust Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-200">
              Community Skin Outreach
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">Restoring Skin Health & Confidence Without Financial Barriers</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              The DermaLuxe Healthy Skin Foundation was established to ensure that children and individuals suffering from debilitating eczema, childhood hemangiomas, vitiligo, and severe burn scar contractures receive world-class dermatological care.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Over the past decade, our foundation has sponsored free phototherapy sessions for over 1,500 vitiligo patients, provided free non-steroidal barrier creams for 3,000+ children, and conducted mobile skin health camps across rural communities.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1576091160291-248b1df53937?auto=format&fit=crop&w=800&q=80"
              alt="Community Pediatric Dermatology Camp"
              className="w-full h-72 object-cover rounded-3xl shadow-sm"
            />
          </div>
        </div>

        {/* Objectives & Community Programs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <Heart className="w-8 h-8 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900 font-heading">Pediatric Eczema & Hemangioma Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">100% free non-steroidal barrier repair ointments and pulsed dye laser care for underprivileged children.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <Users className="w-8 h-8 text-pink-600" />
            <h3 className="text-base font-bold text-slate-900 font-heading">Vitiligo Phototherapy Subsidy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Sponsoring Narrowband UVB chamber phototherapy sessions to restore repigmentation and confidence.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <Gift className="w-8 h-8 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 font-heading">Free Sunscreen & Skin Health Camps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Distributing broad-spectrum sunscreens, fungal treatments, and conducting free VISIA 3D complexion diagnostics.</p>
          </div>
        </div>

        {/* Donation Section */}
        <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 border border-rose-900/40">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-500/30">
              80G Tax Exempted Contribution
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading">Help a Child Live Rash-Free & Confident</h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              100% of voluntary contributions directly sponsor pediatric skin medications, laser treatments, and phototherapy.
            </p>
          </div>

          {donated ? (
            <div className="p-8 text-center bg-white/10 backdrop-blur-md rounded-2xl max-w-md mx-auto space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white font-heading">Thank You for Your Generosity!</h3>
              <p className="text-xs text-slate-300">
                Your donation of <span className="font-bold text-rose-400">₹{donationAmount}</span> has been received. An official 80G tax certificate has been sent to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="max-w-xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                {['1000', '2500', '5000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDonationAmount(amt)}
                    className={`py-3 rounded-xl font-bold transition-all cursor-pointer ${
                      donationAmount === amt
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    ₹ {amt}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-xs"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Phone"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Donate ₹ {donationAmount} (80G Tax Exemption)</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default CharitableTrustPage;
