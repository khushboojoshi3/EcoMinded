import Art from "../models/Art.js";

export const createArt = async (req, res, next) => {
    const newArt = new Art(req.body);
  
    try {
      const savedArt = await newArt.save();
      res.status(200).json(savedArt);
    } catch (err) {
      next(err);
    }
};

export const updateArt = async (req, res, next) => {
  try {
    const updatedArt = await Art.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedArt);
  } catch (err) {
    next(err);
  }
};

export const deleteArt = async (req, res, next) => {
  try {
    await Art.findByIdAndDelete(req.params.id);
    res.status(200).json("Art has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getArt = async (req, res, next) => {
  try {
    const art = await Art.findById(req.params.id);
    res.status(200).json(art);
  } catch (err) {
    next(err);
  }
};

export const getArts = async (req,res,next)=>{
    try {
      const arts = await Art.find();
      res.status(200).json(arts);
    } catch (err) {
      next(err);
    }
  };

// export const createMovie = async (req, res, next) => {
//   const newMovie = new Movie(req.body);

//   try {
//     const savedMovie = await newMovie.save();
//     res.status(200).json(savedMovie);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getArts = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const Arts = await Art.find({
//       ...others,
//       cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//     }).limit(req.query.limit);
//     res.status(200).json(movies);
//   } catch (err) {
//     next(err);
//   }
// };

// export const countByCity = async (req, res, next) => {
//   const cities = req.query.cities.split(",");
//   try {
//     const list = await Promise.all(
//       cities.map((city) => {
//         return Movie.countDocuments({ city: city });
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };

// export const countByGenre = async (req, res, next) => {
//   try {
//     const comedyCount = await Movie.countDocuments({ genre: "Comedy" });
//     const fantasyCount = await Movie.countDocuments({ genre: "Fantasy" });
//     const romanticCount = await Movie.countDocuments({ genre: "Romantic" });
//     const thrillerCount = await Movie.countDocuments({ genre: "Thriller" });
//     const scifiCount = await Movie.countDocuments({ genre: "Scifi" });

//     res.status(200).json([
//       { genre: "Comedy", count: comedyCount },
//       { genre: "Fantasy", count: fantasyCount },
//       { genre: "Romantic", count: romanticCount },
//       { genre: "Thriller", count: thrillerCount },
//       { genre: "Scifi", count: scifiCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };


// export const getMyArts = async (req, res, next) => {
//   try {
//     const Art = await Art.findById(req.params.id);
//     const list = await Promise.all(
//       Art.theaters.map((theater) => {
//         return Theater.findById(theater);
//       })
//     );
//     const obj = [];
//     for (let i = 0; i < list.length; i++){
//       const theater = list[i];
//       const shows = await Promise.all(
//         theater.shows.map((show) => {
//           return Show.findById(show);
//         })
//       );
//       obj.push({ theater: theater, shows: shows});
//     }
//     res.status(200).json(obj)
//   } catch (err) {
//     next(err);
//   }
// };