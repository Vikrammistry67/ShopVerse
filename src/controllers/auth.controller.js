import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _config from '../config/config.js';
import _redis from '../config/redis.js';
import crypto from "crypto";
import sendEmail from "../utils/sendMail.js";


export const registerUser = async (req, res, next) => {
    const { username, fullName, email, password, role } = req.body;
    const { firstName, lastName } = fullName;

    const isEmailAlreadyexist = await userModel.findOne({ email });

    if (isEmailAlreadyexist) {
        return res.status(409).json({
            message: 'user already exist'
        })
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        fullName: {
            firstName,
            lastName
        },
        email,
        role,
        password: hashPassword
    });

    const token = jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email
    }, _config.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
        message: 'user registered successfully',
        user
    })
};


export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    const isValidEmail = await userModel.findOne({ email });

    if (!isValidEmail) {
        res.status(400).json({
            message: 'Invalid Email'
        })
    };

    const isValidPassword = await bcrypt.compare(password, isValidEmail.password || '');

    if (!isValidPassword) {
        res.status(400).json({
            message: 'Wrong Password'
        })
    };



    const token = jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email
    }, _config.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
        message: 'user loggedIn successfully',
        email: email
    })

};


export const getUserDetails = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const currentUser = await userModel.findById({ _id: userId });
        return res.status(200).json({
            message: 'current User details fethched successfully',
            userDetails: currentUser
        })
    } catch (error) {
        new Error('failed to fetch current user details');
    }
};


export const logOutUser = async (req, res) => {
    try {
        let token =
            req.cookies?.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const decoded = jwt.decode(token);

        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const expiryTime = decoded.exp - Math.floor(Date.now() / 1000);

        if (expiryTime > 0) {
            await _redis.set(token, "blacklisted", "EX", expiryTime);
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

        await user.save();
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            "Password Reset",
            `
                 <h2>Password Reset</h2>
                 <p>Click below to reset your password:</p>
                 <a href="${resetUrl}">Reset Password</a>
  `
        );
        res.json({ message: "Reset link sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
}


export const resetPassword = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        const userId = req.user.id;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
            token,
            userId
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};


export const getUserAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById({ userId })
            .select("name email")
            .lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found | not fetched user Address'
            })
        } else {
            return res.status(200).json({
                message: 'users addresses fetched successfully',
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
        }

    } catch (error) {
        new Error(`failed to fething user Addresses ${error}`)
    }
};


export const addUserAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { street, city, state, zip, country, isDefault } = req.body;

        const userAddress = await userModel.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    addresses: {
                        street,
                        city,
                        state,
                        pincode,
                        country,
                        isDefault
                    }
                }
            }, { new: true }
        );

        const user = await userModel.findById({ userId });

        return res.status(201).json({
            message: 'user address added successfully',
            user: user
        })
    } catch (error) {

    }

};


export const getUserAddressById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const usersAddress = await userModel.findById({ userId });
        return res.status(200).json({
            message: 'User addresses details by ID fetched successfully',
            userAddressDetails: usersAddress
        });
    } catch (error) {
        new Error(`failed to fetch userAddress By ID : ${error}`);
    }
};


export const deleteUserAddress = async (req, res, next) => {
    const id = req.user.id;
    const { addressId } = req.params;


    const isAddressExists = await userModel.findOne({ _id: id, 'addresses._id': addressId });


    if (!isAddressExists) {
        return res.status(404).json({ message: "Address not found" });
    }

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        $pull: {
            addresses: { _id: addressId }
        }
    }, { new: true });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const addressExists = user.addresses.some(addr => addr._id.toString() === addressId);
    if (addressExists) {
        return res.status(500).json({ message: "Failed to delete address" });
    }

    return res.status(200).json({
        message: "Address deleted successfully",
        addresses: user.addresses
    });
};