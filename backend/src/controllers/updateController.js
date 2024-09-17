import { User } from "../models/userSchema.js";

export const updateController = async (req, res) => {
  const { id } = req.params; // Get the user ID from params
  const data = req.body; // Destructure data from the request body

  console.log("User ID:", id);
  console.log("Data to update:", data);

  if (!id) {
    return res.status(400).send({ message: "User ID is required" });
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).send({ message: "No data provided to update" });
  }

  try {
    // Find user by ID and update with the new data
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules defined in schema are applied
    });

    // If user not found, return a 404 error
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Return the updated user data
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error updating profile", error: error.message });
  }
};
