import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LocalStorageKeys } from "../local-storage/keys";

export const ngxTranslateModuleConfig = TranslateModule.forRoot({
    defaultLanguage: localStorage.getItem(LocalStorageKeys.preferredLang) ?? 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) =>
        new TranslateHttpLoader(http, '/i18n/', '.json'),
      deps: [HttpClient],
    },
  });