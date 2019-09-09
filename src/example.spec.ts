import { error } from "util";

class FriendsList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is now a friend.`);
    }

    removeFriend(name) {
        const idx = this.friends.indexOf(name);

        if (idx === -1) {
            throw new Error('Friend not found.');
        }

        this.friends.splice(idx, 1);
    }
}


describe('FriendsList', () => {
    let friendsList;

    beforeEach(() => {
        friendsList = new FriendsList();
    });

    it('Intializes friends list', () => {
        expect(friendsList.friends.length).toEqual(0);
    })

    it('Adds a friend to list', () => {
        friendsList.addFriend('Ishraq');
        expect(friendsList.addFriend.length).toEqual(1);
    })

    it('Announces friendship', () => {
        friendsList.announceFriendship = jest.fn();
        expect(friendsList.announceFriendship).not.toHaveBeenCalled();
        friendsList.addFriend('Ishraq');
        expect(friendsList.announceFriendship).toHaveBeenCalled();
    })


    describe('Remove Friends', () => {

        it('Removes a friend', () => {
            friendsList.addFriend('Ishraq');
            expect(friendsList.friends[0]).toEqual('Ishraq');
            friendsList.removeFriend('Ishraq');
            expect(friendsList.friends[0]).toBeUndefined();
        })

        it('Throws error when friend not found', () => {
            expect(() => friendsList.removeFriend('Ishraq')).toThrow();
        })
    });

})

