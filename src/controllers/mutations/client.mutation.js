import AppClient from "../../models/Client.js";
import hashData from "../../helpers/hashData.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { io } from "../../index.js";


export const loginClient = async (req, res) => {
    const { email, password } = req.body;
    console.log("loginClient")
    console.log(req.body)
    try {
        const client = await
        AppClient.findOne({ email });
        console.log("account: " + client);
        if (!client) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        console.log(client);

        bcrypt.compare(password, client.password, (err, result) => {
            console.log(result);
            if (err || !result) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

        }
        );
        // Create a JWT token
        const token = jwt.sign(
            { id: client.id, name: client.name },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "100000h",
            }
        );
 
        res.json({ message: "Login successful", token, userData: client });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "loginClient",
            success: false,
        });
    }
}

export const signUpClient = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const hashedPassword = await hashData(password);

        const newClient = await AppClient.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        const client = await newClient.save();
        res.status(201).json({ message: "Client created", data: client });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "signUpClient",
            success: false,
        });
    }
}

export const getClient = async (req, res) => {
    try {
        //decode the token in Authorization header
        const token = req.header("Authorization");
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
        const client = await AppClient.findById(decoded.id);
        if (!client) {
            return res.status(401).json({ error: "Client not found" });
        }

        const { phone, name, email, _id } = client;

        res.status(200).json({ message: "Client found", data: { phone, name, email, _id } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "getClient",
            success: false,
        });
    }
}


export const getOtherClient = async (req, res) => {
    try {
        const {id} = req.query
        const client = await AppClient.findById(id);
        if (!client) {
            return res.status(401).json({ error: "Client not found" });
        }

        const { name, email, phone } = client;

        res.status(200).json({ message: "Client found", data: { name, email, phone } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "getClient",
            success: false,
        });
    }
}


export const getScannedClients = async (req, res) => {
    try {
        const {id} = req.user;
        const client = await AppClient.findById(id);
        if (!client) {
            return res.status(401).json({ error: "Client not found" });
        }

        //loop through the scanned id array from other clients and get their details

        const scannedClients = await AppClient.find({ _id: { $in: client.scanned } });
        //only return the name, email and phone of the clients
        const data = scannedClients.map((client) => {
            const { name, email, phone } = client;
            return { name, email, phone };
        });

        res.status(200).json({ message: "Scanned clients found", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "getScannedClients",
            success: false,
        });
    }
}
