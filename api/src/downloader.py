import os
import yt_dlp


BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DOWNLOAD_FOLDER = os.path.join(BASE_DIR, 'media', 'tmp')


class Downloader:
    def __init__(self):
        self.yt_dlp_opts = {
            'format': 'bestaudio/best',
            'keepvideo': False,
            'extract_audio': True,
            'audio-format': 'mp3',
            'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
            # 'progress_hooks': [self.__progress_hook], # It may not be used at the end
        }
        self.info = None

    # def __progress_hook(self, d):
    #     thumbnails = d['info_dict'].get('thumbnails', [])
    #     if thumbnails:
    #         # Sort thumbnails by resolution or by width (assuming higher width means better quality)
    #         thumbnails.sort(key=lambda x: x.get('width', 0), reverse=True)
    #         best_thumbnail_url = thumbnails[0].get('url', '')
    #     else:
    #         best_thumbnail_url = ''

    #     info = {
    #         'title': d['filename'],
    #         'downloaded_bytes': d['downloaded_bytes'],
    #         'total_bytes': d['total_bytes'],
    #         'status': d['status'],
    #         'speed': d['speed'],
    #         'thumbnail': best_thumbnail_url
    #     }
    #     self.info = info

    def update_path(self, path):
        self.yt_dlp_opts['outtmpl'] = '{}/%(title)s.mp3'.format(path)

    def download(self, id):
        with yt_dlp.YoutubeDL(self.yt_dlp_opts) as ydl:
            ydl.download(["https://youtu.be/{}".format(id)])

    def fetch_status(self):
        return self.info


def main():
    pass


if __name__ == "__main__":
    main()
