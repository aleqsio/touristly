from console_api.models import PersonModel, TouristSpotModel


class Provider():
    @staticmethod
    def get_top_spots_for_user(aud,count):
        if not count:
            count=4
        user = PersonModel.objects.get_or_create(aud=aud)[0]
        spots = TouristSpotModel.objects.all()
        new_spots = []
        print(user.skips.all())
        for spot in spots:
            tmp_spot=spot
            if spot.key in map(lambda x: x.key, user.likes.all()):
                continue
            if spot.key not in map(lambda x:x.key,user.skips.all()):
                new_spots.append(tmp_spot)
            if len(new_spots) == count:
                break
        return new_spots

    def get_top_promoted_spots_for_user(aud,count):
        if not count:
            count=100
        user = PersonModel.objects.get_or_create(aud=aud)[0]
        spots = TouristSpotModel.objects.all()
        new_spots = []
        print(user.skips.all())
        for spot in spots:
            tmp_spot=spot
            if spot.key in map(lambda x: x.key, user.likes.all()):
                tmp_spot.promoted=True
                new_spots.append(tmp_spot)
            if len(new_spots) == count:
                break
        return new_spots