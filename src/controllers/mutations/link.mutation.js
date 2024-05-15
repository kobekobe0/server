import Link from "../../models/Link.js";

export const createLink = async (req, res) => {
    try {
        //check if url has http or https, if not, add
        let { url, name } = req.body;

        if (!url.includes("http") && !url.includes("https")) {
            url = `https://${url}`;
        }

        const {id} = req.user;
        const link = await Link.create({ url, website:name, clientId: id });
        
        if(!link){
            return res.status(400).json({message: "Link not created"});
        }

        res.status(201).json({message: "Link created", data: link});
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "createLink",
            success: false,
        });
    }
}

export const deleteLink = async (req, res) => {
    try {
        const { id } = req.query;
        const link = await Link.findByIdAndDelete(id);
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json({ message: "Link deleted", data: link });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "deleteLink",
            success: false,
        });
    }
}


export const getLinks = async (req, res) => {
    try {
        const { id } = req.user;
        const links = await Link.find({ clientId: id });
        if (!links) {
            return res.status(404).json({ message: "Links not found" });
        }

        res.status(200).json({ message: "Links found", data: links });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "getLinks",
            success: false,
        });
    }
}

export const getOtherLinks = async (req, res) => {
    try {
        const { id } = req.query;
        const links = await Link.find({ clientId: id });
        if (!links) {
            return res.status(404).json({ message: "Links not found" });
        }

        res.status(200).json({ message: "Links found", data: links });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            details: error,
            function: "getOtherLinks",
            success: false,
        });
    }
}
