// import React, { useState } from 'react';

// const Contactus = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted', formData);
//     alert('Form Submitted Successfully!');
//   };

//   return (
//     <div className="container">
//       <h1>Contact Me</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="message" className="form-label">Message</label>
//           <textarea className="form-control" id="message" name="message" rows="3" value={formData.message} onChange={handleChange} required></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Contactus;
