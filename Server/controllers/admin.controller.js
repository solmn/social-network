const path = require('path'),
    { ApiResponse } = require(path.join(__dirname, '..', 'util')),
    { adminService } = require(path.join(__dirname, '..', 'services'));

exports.getBadWords = async(req, res, next) => {
    try {
        let response = await adminService.getBadWords();
        res.status(response.status).json(response);
    } catch (err) {
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.addBadWord = async(req, res, next) => {
    try {
        let allBadWords = await adminService.addBadWord(req.body.newBadWord);
        res.status(allBadWords.status).json(allBadWords);
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "error", err))
    }

}

exports.removeBadWord = (req, res, next) => {
    adminService.removeBadWord(req.body.badwords);
}


exports.updateBadWord = (req, res, next) => {
    try {
        let updatedBadWords = adminService.updateBadWordList(req.body);
        res.status(updatedBadWords.status).json(updatedBadWords);
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err))
    }
}

exports.createAd = async(req, res, next) => {
    try {
        let result = await adminService.addAdvertisement(req.body);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err))
    }
}

exports.getAllAdverts = async(req, res, next) => {
    try {
        let result = await adminService.getAllAdvertisements();
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }
}

exports.editAdvertisement = async(req, res, next) => {

    try {
        let result = await adminService.editAdvertisement(req.params._id, req.params.edited);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }
}

exports.getAdv = async(req, res, next) => {
    try {
        return res.json(await adminService.getAdvertisement(req.params.id));
    } catch (err) {
        return res.json({ error: err })

    }
}

exports.deleteAdvertisement = async(req, res, next) => {
    try {
        let result = await adminService.deleteAd(req.body._id);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }
}
exports.approvePost = async(req, res, next) => {
    try {
        let result = await adminService.approveThisPost(req.userId, req.body);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }

}
exports.rejectPost = async(req, res, next) => {
    try {
        let result = await adminService.rejectThisPost(req.userId, req.body);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }
}

exports.activateUserAccount = async(req, res, next) => {
    try {
        // console.log('account id to activate:  ', req.body._id)
        console.log('IN THE ADMIN CONTROLLER...................:  ', req.body._id)
        let result = await adminService.activateThisAccount(req.body._id);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        console.log('errrrrrrrrrrrrrr', err)
        res.status(500).json(new ApiResponse(500, "err", err));
    }

}
exports.getDeactivatedUserAccounts = async(req, res, next) => {
    try {
        let result = await adminService.getDeactivatedAccounts();
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }

}
exports.getBadWordedPosts = async(req, res, next) => {
    try {
        let result = await adminService.getPostToReview(req.userId);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }

}

exports.deactivateAccount = async(req, res, next) => {
    try {
        let result = await adminService.deactivateThisAccount(req.body);
        console.log(result);
        res.status(200).json(new ApiResponse(200, "success", result));
    } catch (err) {
        res.status(500).json(new ApiResponse(500, "err", err));
    }

}