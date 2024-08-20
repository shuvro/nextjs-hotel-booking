# BOOK IT - A BOOKING APP

# Packages used:

- [Next Connect](https://www.npmjs.com/package/next-connect): To create promised based and efficient middleware for Next.js
- [Mongoose](https://www.npmjs.com/package/mongoose): To create models and connect to MongoDB
- [Bootstrap](https://getbootstrap.com/): To create responsive and mobile-first websites
- [React Star Ratings](https://www.npmjs.com/package/react-star-ratings): To create star rating component
- [React Hot Toast](https://www.npmjs.com/package/react-hot-toast): To create toast notifications
- [React Bootstrap](https://react-bootstrap.github.io/): To create responsive and mobile-first components
- [React Pagination](https://www.npmjs.com/package/react-js-pagination): To create pagination
- [Bcrypt](https://www.npmjs.com/package/bcryptjs): To hash passwords
- [Redux toolkit](https://redux-toolkit.js.org/): To manage state
- [Cloudinary](https://cloudinary.com/): To store images
- [Mailtrap](https://mailtrap.io/): To test emails
- [Mapquest](https://developer.mapquest.com/): To get geocoding data
- [Node Geocoder](https://www.npmjs.com/package/node-geocoder): To get geocoding data
- [Mapbox](https://www.mapbox.com/): To create map
- [React datepicker](https://www.npmjs.com/package/react-datepicker): To create datepicker
- [MomentJS](https://momentjs.com/): To format dates
- [MDB React](https://mdbootstrap.com/docs/react/): To create components to display data in tables like Bookings and Reviews
- [HTML2Canvas](https://www.npmjs.com/package/html2canvas): To create screenshots of the booking details
- [JSPDF](https://www.npmjs.com/package/jspdf): To create PDF of the booking details
- [Stripe NodeJS](https://www.npmjs.com/package/stripe): To create payment intent and process payments
- [React ChartJS 2](https://www.npmjs.com/package/react-chartjs-2): To create charts


# How to run the app:

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env.local` file in the root directory from the `.env.example` file
4. Add your MongoDB URI, Cloudinary details, Mapquest API key, Mapbox API key, Stripe secret key, and Mailtrap details
5. Run `npm run dev` to start the development server
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser
7. Set up a Stripe account and add your Stripe public key to the `.env` file
8. Set up Mapbox account and add your Mapbox public key to the `RoomDetails.tsx` file
9. In a separate terminal, run `stripe login` to login to your Stripe account and run `stripe listen --forward-to localhost:3000/api/payment/webhook` to listen to Stripe events
