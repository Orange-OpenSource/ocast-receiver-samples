import { EnumError, EnumTrack, IMediaNotifier, Logger } from 'ocast-sdk';
import { PlayerService } from './PlayerService';

export class OrgOCastMediaChannelService implements IMediaNotifier {
  private TAG = ' [OCastMediaChannelService] ';
  private logger = Logger.getInstance();

  constructor(
    private playerService: PlayerService) {
  }

  public onPrepare(url, title, subtitle, logo, mediaType, transferMode, autoplay, frequency, options) {
    this.logger.info(this.TAG + 'onPrepare(' + url + ',' + mediaType + ',' + transferMode +
      ',' + autoplay + ',' + frequency + ')');
    return this.playerService.prepare(url, title, subtitle, logo, mediaType, autoplay, options).then((isOk) => {
      if (isOk === true) {
        return EnumError.OK;
      } else {
        return EnumError.UNKNOWN_MEDIA_TYPE;
      }
    });
}

  public onUpdateStatus(playbackStatus) {
    this.logger.info(this.TAG + ' onUpdateStatus(' + playbackStatus + ')');
    // not impl
    return EnumError.OK;
  }

  public onStop() {
    this.logger.info(this.TAG + ' onStop');
    this.playerService.stop();
    return EnumError.OK;
  }

  public onPause() {
    this.logger.info(this.TAG + ' onPause');
    this.playerService.pause();
    return EnumError.OK;
  }

  public onPlay(position) {
    this.logger.info(this.TAG + ' onPlay(' + position + ')');
    if (position) {
      this.playerService.seek(position);
    }
    return EnumError.OK;
  }

  public onResume() {
    this.logger.info(this.TAG + ' onResume');
    return EnumError.OK;
  }

  public onSeek(position) {
    this.logger.info(this.TAG + ' onSeek(' + position + ')');
    this.playerService.seek(position);
    return EnumError.OK;
  }

  public onMute(mute) {
    this.logger.info(this.TAG + ' onMute(' + mute + ')');
    this.playerService.mute(mute);
    return EnumError.OK;
  }

  public onClose() {
    this.logger.info(this.TAG + ' onClose');
    this.playerService.stop();
    return EnumError.OK;
  }

  public onTrack(type: EnumTrack, trackId: string, enabled: boolean, options: any): Promise<EnumError> {
    this.logger.info(this.TAG + ' onTrack(' + type + ',' + trackId + ',' + enabled + ')');
    return this.playerService.setTrack(type, trackId, enabled).then((isOK) => {
      if (isOK === true) {
        return EnumError.OK;
      } else {
        return EnumError.PARAMS_MISSING;
      }
    });
  }

  public onUpdateMetadata(object) {
    this.logger.info(this.TAG + JSON.stringify(object, null, 2));
    //  not impl
    return EnumError.OK;
  }

  public onVolume(volume: any, options?) {
    this.logger.info(this.TAG + ' onVolume(' + volume + ')');
    const currentVolume = !(volume < 0 || volume > 1) ? volume : 0.5;
    this.playerService.setVolume(currentVolume);
    return EnumError.OK;
  }

}
