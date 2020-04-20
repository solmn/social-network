const
    path = require('path'),
    { ApiResponse, notiType } = require(path.join(__dirname, "..", "..", "util")),
    { Ad, User, Post } = require(path.join(__dirname, '..', '..', 'models')),
    { filterService } = require(path.join(__dirname, '..', 'shared'));

function addBadWord(bWord) {
    try {
        let result = filterService.addNewBadWord(bWord);
        return new ApiResponse(200, "success", result);
    } catch (err) {
        console.log("FROM SERVICE.......", err);
    }

}

async function getBadWords() {
    try {
        let result = await filterService.getBadWordList();
        return new ApiResponse(200, "success", result);
    } catch (err) {
        console.log("FROM SERVICE.......", err);
    }

}

function removeBadWord(thisBadWord) {
    filterService.removeBadWord(thisBadWord);
}
/**
 * Update Bad words list 
 * @param {a complete JSON object of bad-words coming from the admin to replace existing one/ mass update} withThisList 
 */
function updateBadWordList(withThisList) {
    try {
        let result = filterService.updateBadWordList(withThisList);
        return new ApiResponse(200, "success", result);
    } catch (err) {
        console.log("FROM SERVICE.......", err);
    }

}
/**
 * A function to review a post to be used by admin 
 * @param {a boolean indicating the decision of the admin} postIsOkay 
 * @param {Id of a user specific to the post} userId 
 * @param {Id of the current post under review } postId 
 */

async function addAdvertisement(advData) {
    const advertisement = new Ad({
        description: advData.description,
        imageUrl: advData.imageUrl,
        postedBy: advData.postedBy,
        minAge: advData.minAge,
        maxAge: advData.maxAge,
        targetType: advData.targetType,
        targetLocation: advData.targetLocation
    });
    let savedAdd = await advertisement.save();
    return savedAdd;
}

async function getAllAdvertisements() {
    let allAdverts = await Ad.aggregate([{ $sort: { createdAt: -1 } }]);
    return allAdverts;
}

async function editAdvertisement(ad_Id, editedAd) {

    return await Ad.updateOne({ _id: ad_Id }, {
        $set: {
            description: editedAd.description,
            imageUrl: editedAd.imageUrl,
            postedBy: editedAd.postedBy,
            minAge: editedAd.minAge,
            maxAge: editedAd.maxAge,
            targetType: editedAd.targetType,
            targetLocation: editedAd.targetLocation

        }
    });

}

async function getAdvertisement(id) {
    return await Ad.findById({ _id: id });

}

async function deleteAd(id) {
    let result = await Ad.findByIdAndRemove({ _id: id });
    return result;
}

async function approveThisPost(adminId, body) {
    let result = await Post.updateOne({ _id: body.postId }, { status: 'okay' });
    let ademin = await User.updateOne({ _id: adminId }, {
        $pull: {
            notifications: { _id: body.notiId }
        }
    });
    return result;
}

async function rejectThisPost(adminId, body) {
    let result = await Post.updateOne({ _id: body.postId }, { status: 'blocked' });
    let result2 = await User.updateOne({ _id: body.userId }, { $inc: { badPostCount: 1 } });
    let admin = await User.updateOne({ _id: adminId }, {
        $pull: {
            notifications: { _id: body.notiId }
        }
    });
    return result;
}

async function activateThisAccount(thisUserAccount) {
    let result = await User.updateOne({ _id: thisUserAccount }, { $set: { status: 'active' } });
    return result;
}

async function getDeactivatedAccounts() {
    let results = await User.find({ status: 'requested' });
    return results;
}

async function getPostToReview(id) {
    let results = await User.findOne({ $and: [{ _id: id }, { 'notifications.notiType': 5 }] }, { notifications: 1 })
        .populate('notifications.user')
        .populate('notifications.post');
    return results.notifications;
}
async function deactivateThisAccount(data) {
    let deactivatedUser = await User.updateOne({ _id: data.userId }, { $set: { status: 'deactivated' } });
    let blockedPost = await Post.updateOne({ _id: data.postId }, { $set: { status: "blocked" } });
    let admin = await User.updateOne({ _id: data.notiId }, {
        $pull: {
            notifications: { _id: data.notiId }
        }
    });
    return { deactivatedUser, blockedPost, admin };
}
module.exports = {
    deleteAd,
    addBadWord,
    getBadWords,
    removeBadWord,
    updateBadWordList,
    addAdvertisement,
    getAdvertisement,
    editAdvertisement,
    deleteAd,
    getAllAdvertisements,
    approveThisPost,
    rejectThisPost,
    activateThisAccount,
    getDeactivatedAccounts,
    getPostToReview,
    deactivateThisAccount

}