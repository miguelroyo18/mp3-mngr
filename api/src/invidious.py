import requests
import json


class Invidious:
    def __init__(self):
        self.base_url = "https://yt.artemislena.eu"

    def search_track(self, query):
        response = requests.get(f'{self.base_url}/api/v1/search', params={'q': query, 'type': 'video'})
        if response.status_code == 200:
            tracks = response.json()
            sorted_tracks = sorted(tracks, key=lambda x: x.get('viewCount', 0), reverse=True)
            return sorted_tracks
        else:
            return None


def main():
    query = "the entertainment's here"
    test = Invidious()
    print(test.search_track(query))


if __name__ == "__main__":
    main()
