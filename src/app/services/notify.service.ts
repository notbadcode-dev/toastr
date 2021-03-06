import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService, GlobalConfig, ActiveToast } from 'ngx-toastr';
import { ConfigToast } from '../models/config-notify.model';

const TOAST_CLASS_BASE = 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  options: GlobalConfig;

  constructor(
    private toastr: ToastrService
    ) {
      this.options = this.toastr.toastrConfig;
    }

  info(configToast: ConfigToast): void {
    const { message, title, override } = this.getConfigToast('info', configToast);
    this.toastr.info(message, title, override);
  }

  success(configToast: ConfigToast): void {
    const { message, title, override } = this.getConfigToast('success', configToast);
    this.toastr.success(message, title, override);
  }

  warning(configToast: ConfigToast): void {
    const { message, title, override } = this.getConfigToast('warning', configToast);
    this.toastr.warning(message, title, override);
  }

  error(configToast: ConfigToast): void {
    const { message, title, override } = this.getConfigToast('error', configToast);
    this.toastr.error(message, title, override);
  }

  clearAll(): void {
    this.toastr.clear()
  }

  clearLast(): void {
    const lastNotifyId: number = this.toastr.toasts[this.toastr.toasts.length - 1].toastId;
    this.toastr.clear(lastNotifyId);
  }

  transformConfigToast(eventName: string, configToast: ConfigToast): Partial<IndividualConfig> | undefined {
    const opt: GlobalConfig = JSON.parse(JSON.stringify(this.options));

    opt.progressBar = configToast.progressBar ?? opt.progressBar;
    opt.progressAnimation = configToast.progressAnimation ??  opt.progressAnimation;
    opt.timeOut = configToast.timeOut ??  opt.timeOut;;
    opt.disableTimeOut = configToast.disableTimeOut ??  opt.disableTimeOut;;
    opt.positionClass = configToast.positionClass ??  opt.positionClass;
    opt.toastClass = `${TOAST_CLASS_BASE} notify-${eventName}`;
    opt.enableHtml = configToast.enableHtml ?? opt.enableHtml;
    opt.tapToDismiss = configToast.tapToDismiss ?? opt.tapToDismiss;
    opt.closeButton = configToast.closeButton ?? opt.closeButton;
    opt.easeTime = configToast.easeTime ?? opt.easeTime;

    return opt;
  }

  transformGlobalConfigToast(configToast: ConfigToast): any {
    const opt: GlobalConfig = JSON.parse(JSON.stringify(this.options));

    this.toastr.toastrConfig.preventDuplicates = configToast.preventDuplicates ?? opt.preventDuplicates;
    this.toastr.toastrConfig.countDuplicates = configToast.countDuplicates ?? opt.countDuplicates;
    this.toastr.toastrConfig.resetTimeoutOnDuplicate = configToast.resetTimeoutOnDuplicate ?? opt.resetTimeoutOnDuplicate;
    this.toastr.toastrConfig.includeTitleDuplicates = configToast.includeTitleDuplicates ?? opt.includeTitleDuplicates;
    this.toastr.toastrConfig.newestOnTop = configToast.newestOnTop ?? opt.newestOnTop;
    this.toastr.toastrConfig.maxOpened = configToast.maxOpened ?? opt.maxOpened;
    this.toastr.toastrConfig.autoDismiss = configToast.autoDismiss ?? opt.autoDismiss;

    return this.toastr.toastrConfig;
  }

  getConfigToast(eventName: string, configToast: ConfigToast): { message?: string | undefined, title?: string | undefined, override?: Partial<IndividualConfig> | undefined } {
    this.toastr.toastrConfig = this.transformGlobalConfigToast(configToast);
    return {
      title: configToast?.title,
      message: configToast?.message?.length === 0 || configToast.message === null ?  `it's a beautiful toastr` : configToast.message,
      override: this.transformConfigToast(eventName, configToast),
    }
  }

}