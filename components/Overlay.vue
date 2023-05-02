<template>
  <div
    class="overlay absolute left-0 top-0 w-full h-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[50]"
  >
    <div v-if="overlay.type === 'menu'" class="flex flex-col w-full h-full">
      <div class="flex justify-between items-center">
        <div>
          <p v-if="step === 0" class="text-lg font-bold">Menu</p>
          <div
            v-else-if="step === 4"
            class="flex justify-center items-center gap-3"
            @click="step = 3"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Safe Play</p>
          </div>
          <div
            v-else
            class="flex justify-center items-center gap-3"
            @click="step = 0"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Menu</p>
          </div>
        </div>
        <div>
          <Icon type="close" @click="overlay.isOpen = false" />
        </div>
      </div>
      <div v-if="step === 0" class="grow flex flex-col mt-5">
        <div class="grow flex flex-col gap-2">
          <Btn type="dark" @click="handleOverlayClick('manual')"
            >Emotional Futures Manual</Btn
          >
          <Btn type="dark" @click="step = 2">Add Emoxy to Homescreen</Btn>
          <Btn type="dark" @click="step = 3">Safe Play</Btn>
          <Btn
            @click="
              navigateTo('https://discord.gg/sW2PZQpytS', { external: true })
            "
            type="dark"
            >Discord Channel</Btn
          >
          <Btn @click="step = 5" type="dark">Credits</Btn>
          <Btn v-if="user" @click="handleLogoutClick" type="dark">Logout</Btn>
        </div>
        <div class="flex flex-col items-center gap-2 mt-5">
          <div class="flex gap-5">
            <p @click="step = 1" class="text-sm text-center underline">
              Data Privacy
            </p>
            <p @click="step = 6" class="text-sm text-center underline">
              Imprint
            </p>
          </div>
          <Btn v-if="user" @click="handleDeleteClick" type="dark" class="mt-3"
            >Delete All My Data</Btn
          >
        </div>
      </div>
      <div v-if="step === 1" class="grow flex flex-col mt-5 overflow-hidden">
        <p class="text-lg font-bold">Data Privacy</p>
        <div class="mt-5 overflow-y-scroll grow">
          <p>Privacy Notice for Emotional Futures</p>

          <p class="mt-5">
            This Privacy Notice explains how Moritz Tontsch, with Marcel
            Darienzo, Carina Erdmann, Steph Holl-Trieu, Andrew Pasquier, Xiaoji
            Song and Ingeborg Wie Henriksen (hereinafter: 'IRL') processes your
            personal data in connection with your use of the online game 'IRL:
            Emotional Futures', which is accessible at www.emotionalfutures.com
            (hereinafter: '<span class="font-bold">Emotional Futures</span>').
          </p>

          <p class="mt-5">
            The protection of your personal data is important to us. IRL
            therefore collects and processes your personal data in accordance
            with applicable data protection laws, in particular the General Data
            Protection Regulation (EU) 2016/679 (hereinafter: 'GDPR').
          </p>

          <p class="mt-5 font-bold">1. Controller and contact details</p>

          <p class="mt-5">
            The controller for the data processing within the meaning of
            Art. 4 no. 7 GDPR is Moritz Tontsch, IRL, Elbestraße 2 53919
            Weilerswist, Germany, email: irl@emotionalfutures.com ( '<span
              class="font-bold"
              >IRL</span
            >', '<span class="font-bold">we</span>', '<span class="font-bold"
              >our</span
            >', '<span class="font-bold">us</span>', etc.).
          </p>

          <p class="mt-5 font-bold">2. What is personal data</p>

          <p class="mt-5">
            Personal data within the meaning of Art. 4 no. 1 GDPR is all
            information that can be associated with you individually. This for
            example includes your name and your email address. On the other
            hand, general information by means of which you cannot be identified
            does not constitute personal data (e.g. the number of users of
            Emotional Futures).
          </p>

          <p class="mt-5 font-bold">
            3. What types of personal data do we process for which purposes and
            on which legal basis
          </p>

          <p class="mt-5">
            In the following, we describe how IRL collects and processes your
            personal data in connection with your use of Emotional Futures.
          </p>

          <p class="mt-5">
            3.1. Webserver protocols (including the IP address)
          </p>

          <p class="mt-5">
            When you use Emotional Futures, due to technical requirements, our
            web server will automatically record your full IP address, the date
            and the time at which you are using Emotional Futures, the sections
            you access on Emotional Futures, the website you visited before
            accessing Emotional Futures, the browser you use (e.g. Google
            Chrome, Safari etc.), the operating system you use (e.g. Windows 10,
            MacOS, Android, iOS etc.), and the domain name and address of your
            Internet provider (e.g. Deutsche Telekom). This information is
            required for the technical transmission of Emotional Futures and the
            secure operation of the web server on which it is hosted. This
            information is not merged with other data sources.
          </p>

          <p class="mt-5">
            We process this information in order to observe and monitor the
            stability, functionality, and technical performance of Emotional
            Futures and in order to detect, identify, eliminate and solve any
            potential problems and errors within Emotional Futures.
          </p>

          <p class="mt-5">
            The legal basis for the processing of this information is our
            legitimate interests (Art. 6 (1) lit. f GDPR), which consist of
            ensuring and improving the integrity, stability and functionality of
            Emotional Futures – as far as this is technically possible and
            reasonable.
          </p>

          <p class="mt-5">
            Furthermore, for reasons of technical security, in particular, to
            ward off attempted attacks or other abuse of Emotional Futures
            and/or our web server on which it is hosted, this information is
            stored for a short period of time. We are not able to directly
            associate this information with individual persons. After seven days
            at the latest, this information will be anonymized through the
            shortening of the IP address to the domain level, so that it will no
            longer be possible to connect this information to an individual
            person. However, in the period of time until the shortening of the
            IP address, we may process this information in case of a security
            incident (attempted attack or abuse, etc.) in cooperation with your
            internet provider and/or the local authorities in order to identify
            the party that caused the security incident.
          </p>

          <p class="mt-5">
            The legal basis for this is our legitimate interests (Art. 6 (1)
            lit. f GDPR), which consist of protecting the integrity of Emotional
            Futures, our web server, our system and our users.
          </p>

          <p class="mt-5">
            This information will only be processed for statistical, market
            research and/or advertising purposes in anonymized form, i.e. after
            the IP address has been shortened to the domain level.
          </p>

          <p class="mt-5">3.2. Intended use of Emotional Futures</p>

          <p class="mt-5">
            Emotional Futures is an online web-based game and Artwork. We
            process your personal data provided during the game in order to
            enable you to play Emotional Futures as intended by the game plan.
            This in particular includes the following processing activities.
          </p>

          <p class="mt-5">(a) Questionnaire</p>

          <p class="mt-5">
            At the beginning of the game, you are required to complete a
            questionnaire.
          </p>

          <p class="mt-5">
            Through this questionnaire, you answer short questions to assess
            whether you are more giving or taking in your relationships. Your
            answers to the questionnaire are converted to our digital currencies
            value, and therefore are not stored as qualitative data on the user.
            We process your answers in order to set out your initial game
            currencies Blood, Sweat and Tears. This helps to create your
            personal Emoxy, which is your game avatar made up of your current
            account balance of Blood, Sweat and Tears.
          </p>

          <p class="mt-5">
            We process the personal data provided during the questionnaire
            solely to enable you to play Emotional Futures.
          </p>

          <p class="mt-5">
            The legal basis for the processing of your personal data is the
            fulfilment of our contractual obligations to provide Emotional
            Futures to you (Art. 6 (1) lit. b GDPR).
          </p>

          <p class="mt-5">(b) Registration</p>

          <p class="mt-5">
            In order to save your current game progress and to interact with
            other players, you must register with IRL in the next step. For this
            purpose you are asked to enter a name for your Emoxy and your e-mail
            address. The e-mail address has to be confirmed by clicking on the
            link we have sent to your e-mail address.
          </p>
           

          <p class="mt-5">
            You may choose not to provide your real name if you do not feel
            comfortable providing this information. For greater clarity: the
            information you enter in the registration process does not need to
            be true to your individual. It can be made up, such as a nickname or
            a fictional name.
          </p>

          <p class="mt-5">
            Your Emoxy will then be linked to the name chosen for it. If you
            decide to connect with other players, they can see the name of your
            Emoxy.
          </p>

          <p class="mt-5">
            We process and store the personal data provided during the
            registration and password recovery solely to enable you to play
            Emotional Futures with Supabase (Data Processor).
          </p>

          <p class="mt-5">
            The legal basis for the processing of your personal data is the
            fulfilment of our contractual obligations to provide Emotional
            Futures to you (Art. 6 (1) lit. b GDPR).
          </p>

          <p class="mt-5">(c) Interaction with other players</p>

          <p class="mt-5">
            You can connect with other players to join Emotional Futures by
            searching their Emoxy name on the Emotional Futures network. Your
            Emoxy name can be searched and connected by anyone that signed up
            for the Emotional Futures game. In particular, we do not process any
            personal data about who you connect to. The other person becomes
            your so-called 'Accounterpart'. Your Accounterparts can see your
            Emoxy name. Accounterparts can invite each other to further gameplay
            and can subsequently see the interactions they have with each other
            in the gameplay (see Section 3.2 (d)).
          </p>

          <p class="mt-5">
            We process the personal data provided during the interaction with
            other players solely to enable you to play Emotional Futures. The
            legal basis for the processing of your personal data is the
            fulfilment of our contractual obligations to provide Emotional
            Futures to you (Art. 6 (1) lit. b GDPR).
          </p>

          <p class="mt-5">(d) Further gameplay</p>

          <p class="mt-5">
            In further gameplay, you can feed and grow your Emoxy by playing
            so-called Activations with your Accounterparts. Based on certain
            parameters you choose ('Emotion' and 'Relationshape') you and your
            Accounterpart will be shown a task, which needs to be fulfilled
            outside the game. After fulfilling the task, you and your
            Accounterpart evaluate the experience you had when performing the
            task by accounting it with the game currencies Sweat and Tears. Your
            Accounterpart will be able to see your accounting of the game
            currency Tears and you will be able to see their accounting of the
            game currency Tears. You will be awarded with a certain amount of
            the game currency Blood based on the results of the accounting
            process. The game currencies Blood, Sweat and Tears feed and change
            the appearance of your Emoxy.
          </p>

          <p class="mt-5">
            We process all personal data provided during the further gameplay
            solely to enable you to play Emotional Futures.
          </p>

          <p class="mt-5">
            The legal basis for the processing of your personal data is the
            fulfillment of our contractual obligations to provide Emotional
            Futures to you (Art. 6 (1) lit. b GDPR).
          </p>

          <p class="mt-5">3.3. Contacting us</p>

          <p class="mt-5">
            If you wish to contact us, e.g. by e-mail
            (irl@emotionalfutures.com), the data you provide in the process will
            be used to process your inquiry and to contact you. The provision of
            this data is necessary to process and respond to your request;
            without this data we cannot answer your request completely or at
            all.
          </p>
           

          <p class="mt-5">
            The legal basis for the processing of your personal data is the
            fulfilment of our contractual obligations (Art. 6 (1) lit. b GDPR)
            as well as safeguarding our legitimate interests, which include, but
            are not limited to, contacting you and communicating with you about
            any concerns you have contacted us about (Art. 6 (1) lit. f GDPR).
          </p>
           

          <p class="mt-5">3.4. Cookies</p>

          <p class="mt-5">
            We store strictly necessary cookies only to enable basic functioning
            and access to the game.
          </p>

          <p class="mt-5">
            Strictly necessary cookies are those that enable a website to
            function. Without them, it will either not work at all or will not
            work properly. These cookies include ones that enable users to log
            in to secure areas of the website and use a shopping cart. These
            cookies do not track any personal data of visitors.
          </p>

          <p class="mt-5 font-bold">
            4. Automated individual decision-making, including profiling
          </p>

          <p class="mt-5">
            We do not use automated individual decision-making or profiling
            (Art. 22 GDPR).
          </p>

          <p class="mt-5 font-bold">5. Disclosure of your personal data</p>

          <p class="mt-5">
            We do not disclose any personal data to third parties unless such
            disclosure is required for contractual performance or otherwise
            allowed by applicable statutory provisions or unless you have given
            us your consent.
          </p>

          <p class="mt-5">
            Please note that IRL is entitled to outsource the processing of your
            personal data fully or partially to external service providers
            working on behalf of IRL as so-called data processors within the
            meaning of Art. 4 no. 8 GDPR. In this context we may transfer your
            personal data to the technical service provider Supabase (data
            processor), who assist us with the technical provision and support
            of Emotional Futures. In all cases, we have concluded data
            processing agreements with the data processors involved in
            accordance with Art. 28 DSGVO, which stipulate in particular that
            the data processing will be carried out exclusively in accordance
            with the instructions of IRL and in compliance with the applicable
            data protection laws.
          </p>

          <p class="mt-5 font-bold">6. International data transfers</p>

          <p class="mt-5">
            The processing of your personal data may be carried out by IRL in
            Germany, in a Member State of the EU or the EEA or, if an adequacy
            decision pursuant to Art. 45 GDPR exists in a third country outside
            of the EU or the EEA. If a recipient is located outside of the EU or
            the EEA, and no adequacy decision pursuant to Art. 45 GDPR exists in
            such country, IRL will, where required by law, put in place
            appropriate safeguards in accordance with the requirements set by
            applicable data protection law (e.g. the execution of Standard
            Contract Clauses) to ensure that your personal data is duly
            protected through the recipient. You can find out more information
            about these safeguards, and obtain a copy of them, by contacting IRL
            under the contact details as provided in Section 1 above.
          </p>

          <p class="mt-5 font-bold">7. Storage period</p>

          <p class="mt-5">
            IRL only stores your personal data as long as necessary to achieve
            the purposes for which the personal data was collected (i.e.
            provision of Emotional Futures, which includes saving your game
            progress).
          </p>

          <p class="mt-5">
            Your personal data will be automatically deleted no later than the
            scheduled end date of Emotional Futures on 16 May 2024. You can
            choose to delete your data completely at any time by clicking on the
            'Delete all my data' button, which you will find in the Menu. Please
            note that in this case you will lose your game progress and your
            Emoxy.
          </p>

          <p class="mt-5">
            If additional statutory storage obligations exist, your personal
            data will be stored for the duration of the applicable statutory
            storage obligations. After the expiry of the statutory storage
            obligations your personal data will be deleted.
          </p>

          <p class="mt-5 font-bold">
            8. Your data protection rights as a data subject
          </p>

          <p class="mt-5">
            According to applicable data protection law, you are, in particular,
            entitled to the following data protection rights.
          </p>

          <p class="mt-5">
            (a) <span class="font-bold">Right to information</span>: You have
            the right to request at any time information on your personal data
            stored by us.
          </p>

          <p class="mt-5">
            (b) <span class="font-bold">Right to rectification</span>: When
            processing your personal data, we attempt to ensure through
            appropriate measures that your personal data is correct and up to
            date for the purposes for which it has been collected. If your
            personal data is incorrect or incomplete, you may request the
            rectification of the respective data.
          </p>

          <p class="mt-5">
            (c)
            <span class="font-bold"
              >Right to erasure and restriction of processing</span
            >: You may have the right to request the erasure and/or a
            restriction of processing of your personal data, e.g. if, according
            to this Privacy Notice or applicable law, a legitimate business
            purpose for such processing does no longer exist and if statutory
            retention obligations do not require a continued storage.
          </p>

          <p class="mt-5">
            (d) <span class="font-bold">Right to data portability</span>: You
            may have the right to receive the respective personal data you
            provided to us in a structured, commonly used and machine-readable
            format or to transmit those data to another controller.
          </p>

          <p class="mt-5">
            (e)
            <span class="font-bold"
              >Right to object: You may have the right to object, on grounds
              relating to your particular situation, to the processing of your
              personal data. Further, you have the right at any time to object
              to the processing of your personal data for the purposes of direct
              marketing without any reasons.</span
            >
          </p>

          <p class="mt-5">
            (f) <span class="font-bold">Right to complain</span>: You have the
            right to complain to the competent data protection authority. The
            data protection authority responsible for IRL is the Bayerisches
            Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach,
            Germany, phone: +49 (0) 981 180093-0, fax: +49 (0) 981 180093-800,
            email: poststelle@lda.bayern.de. A list of other data protection
            authorities that you can contact (e.g. the one at your place of
            residence) is available <NuxtLink
              to="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank" class="underline"
              >here</NuxtLink
            >.
          </p>

          <p class="mt-5">
            For the purpose of enforcing your data protection rights, please
            contact us via the contact details specified in Section 1 above.
          </p>

          <p class="mt-5 font-bold">9. Right to make changes</p>

          <p class="mt-5">
            We reserve the right to change this Privacy Notice at any time in
            accordance with the statutory provisions. Changes may for example be
            required for compliance with new statutory provisions, due to new
            technologies or in case of new features in Emotional Futures.
          </p>
        </div>
      </div>
      <div v-if="step === 2" class="grow flex flex-col mt-5">
        <p class="text-lg font-bold">Add Emoxy to Homescreen</p>
        <div v-if="isAndroid">
          <p class="mt-5">
            To add your Emoxy to an Android homescreen, open the Emotional
            Futures webapp with Google Chrome on your smartphone.
          </p>
          <p class="mt-5">
            Tap on the screen’s three-dot icon at the top right-hand corner.
          </p>
          <p class="mt-5">Select Add to Homescreen</p>
        </div>
        <div v-else-if="isIos">
          <p class="mt-5">
            To add your Emoxy to an iPhone homescreen, open the Emotional
            Futures webapp with Safari on your smartphone.
          </p>
          <p class="mt-5">
            Tap on the share icon at the center on the bottom of the screen.
          </p>
          <p class="mt-5">Select Add to Homescreen</p>
        </div>
        <div v-else>
          <p class="mt-5">
            To add your Emoxy to an homescreen, open the Emotional Futures
            webapp with Google Chrome or Safari on your smartphone.
          </p>
          <p class="mt-5">Tap on the screen’s three-dot icon at the corner.</p>
          <p class="mt-5">Select Add to Homescreen</p>
        </div>
      </div>
      <div v-if="step === 3" class="grow flex flex-col mt-5 overflow-hidden">
        <p class="text-lg font-bold">Safe Play</p>
        <div class="mt-5 overflow-y-scroll">
          <p>
            Emotional Futures is a game that asks you to play with your
            emotions. Your personal background and relationship dynamics will
            inevitably inform gameplay. Here are a few guidelines on safe play:
          </p>
          <p class="mt-3">
            1. Be aware of your boundaries. If there are any topics you don’t
            want to touch upon, you don’t need to.
          </p>
          <p class="mt-2">
            2. It is completely fine to skip, cheat, make up stories, take a
            break or to stop the game entirely. No explanation is needed.
          </p>
          <p class="mt-2">
            3. It can be nice to talk about limits with your partner before
            playing, and to check in with each other during play.
          </p>
          <p class="mt-2">
            4. At the end of play, take a moment to debrief together: How was
            the game? How did you feel? Did you learn things about each other?
            What concerns arose during play?
          </p>
          <p class="mt-5">
            If you need help or support you can always reach out to us via
            <NuxtLink to="mailto:irl@emotionalfutures.com" class="underline">
              e-mail</NuxtLink
            >. We also manage a
            <span
              @click="
                navigateTo('https://discord.gg/sW2PZQpytS', { external: true })
              "
              class="underline"
              >discord channel</span
            >
            for players to raise questions and connect with the community.
          </p>
          <p class="mt-5">
            If you need professional psychological support, please see our
            Emotional Support Resources.
          </p>
        </div>
        <Btn type="dark" @click="step = 4" class="mt-5"
          >Emotional Support Resources</Btn
        >
      </div>
      <div v-if="step === 4" class="grow flex flex-col mt-5 overflow-hidden">
        <p class="text-lg font-bold">Emotional Support Resources</p>
        <p class="mt-5">
          Should you require professional support, please contact in Germany:
        </p>
        <p class="font-bold mt-5">Telefonseelsorge</p>
        <p class="mt-1">
          Free and confidential crisis helpline for emotional support, available
          24/7. <br />
          0800-111-0-111 or 0800-111-0-222 <br />
          <NuxtLink
            to="https://www.telefonseelsorge.de/"
            target="_blank"
            class="underline"
          >
            www.telefonseelsorge.de
          </NuxtLink>
        </p>
        <p class="mt-5">
          Alternatively you can find information for long-term psychological
          care such as therapy sessions here:
        </p>
        <p class="font-bold mt-5">Therapie.de</p>
        <NuxtLink
          to="https://www.therapie.de/"
          target="_blank"
          class="mt-1 underline"
        >
          www.therapie.de
        </NuxtLink>
      </div>
      <div v-if="step === 5" class="grow flex flex-col mt-5 overflow-y-scroll">
        <p class="text-lg font-bold">Credits</p>
        <div class="overflow-y-scroll mt-5 grow">
          <div class="flex gap-2 items-center">
            <Icon type="mail" size="s/m" />
            <p @click="">irl@emotionalfutures.com</p>
          </div>
          <p class="mt-5">
            Emotional Futures is collaboratively produced by Marcel Darienzo,
            Carina Erdmann, Steph Holl-Trieu, Andrew Pasquier, Xiaoji Song,
            Moritz Tontsch, and Ingeborg Wie Henriksen.
          </p>
          <p class="mt-5">
            IRL Collective, Emotional Futures, 2023.<br />
            Developer: Conrad Weise<br />
            Graphic Designers (Relationshapes, Painted Backdrops): Robuche<br />
            Copy Editor: Mitch Speed<br />
          </p>
          <p class="mt-5">
            Curator (LAS): Liz Stumpf<br />
            Project Manager (LAS): Alexis Convento<br />
            Communications Manager (LAS): Selin Şahin.<br />
          </p>
          <p class="mt-5">
            Special Thanks to: Black Swan, Callie’s, KW, Léon Kruijswijk, Ed
            Fornieles, Penny Rafferty, Calum Bowden, Laura Lotti, Leith
            Benkhedda, Agnesa Schmudke, Carly Whitefield, Patricia Reed.
          </p>
          <p class="mt-5">
            Fonts: Ubuntu Mono by Dalton Maag, Digital Disco by jeti, and
            Arizona by ABCDinamo.<br />
            Icons: Pixelarticons.<br />
          </p>
          <p class="mt-5">
            © 2023 IRL<br />
            Commissioned by LAS Art Foundation<br />
          </p>
        </div>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img
            @click="
              navigateTo('https://discord.gg/sW2PZQpytS', { external: true })
            "
            src="/imgs/logos/irl.png"
            class="h-5 w-auto"
          />
          <img
            @click="
              navigateTo(
                'https://www.las-art.foundation/programme/emotional-futures',
                { external: true }
              )
            "
            src="/imgs/logos/las.png"
            class="h-5 w-auto"
          />
        </div>
      </div>
      <div v-if="step === 6" class="grow flex flex-col mt-5 overflow-y-scroll">
        <p class="text-lg font-bold">Imprint</p>
        <p class="mt-5">
          Moritz Tontsch<br />
          c/o Städelschule<br />
          Dürerstr. 10<br />
          60596 Frankfurt am Main
        </p>
        <p class="mt-5">mail@moritztontsch.com</p>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full">
      <div class="flex justify-between items-center">
        <div>
          <Icon v-if="step === 0" type="files" />
          <div
            v-if="
              (step >= 1 && step <= 9 && step != 8) ||
              step === 12 ||
              step === 13 ||
              step === 15
            "
            class="flex justify-center items-center gap-3"
            @click="step = 0"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Manual</p>
          </div>
          <div
            v-if="step === 8"
            class="flex justify-center items-center gap-3"
            @click="step = 7"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Emotions</p>
          </div>
          <div
            v-if="step === 10"
            class="flex justify-center items-center gap-3"
            @click="step = 9"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Relationshapes</p>
          </div>
          <div
            v-if="step === 11"
            class="flex justify-center items-center gap-3"
            @click="step = 10"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">See All Relationshapes</p>
          </div>
          <div
            v-if="step === 14"
            class="flex justify-center items-center gap-3"
            @click="step = 12"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Accounting</p>
          </div>
        </div>
        <div v-if="step === 0">
          <p class="text-sm text-white-50">Manual</p>
        </div>
        <div>
          <Icon type="close" @click="overlay.isOpen = false" />
        </div>
      </div>
      <div v-if="step === 0" class="grow flex flex-col justify-between mt-5">
        <div>
          <p class="text-lg font-bold">Emotional Futures Manual</p>
          <div class="flex flex-col gap-2 mt-5">
            <Btn
              v-for="p in [
                ['Emoxy', 1],
                ['EOS', 15],
                ['Accounterparts', 2],
                ['Activations', 4],
                ['Emotions', 7],
                ['Relationshapes', 9],
                ['Accounting', 12]
              ]"
              @click="step = Number(p[1])"
              type="dark"
              >{{ p[0] }}</Btn
            >
          </div>
        </div>
        <p
          @click="
            navigateTo(`${useRuntimeConfig().baseURL}/ef-playbook.pdf`, {
              external: true
            })
          "
          class="font-bold text-center underline"
        >
          Download Complete Manual
        </p>
      </div>
      <div v-if="step === 1" class="grow flex flex-col mt-5">
        <p class="text-lg font-bold">Emoxy</p>
        <Icon type="heart" class="mt-5" />
        <p class="mt-5">
          The Emoxy is an emotional proxy, an alchemical creature that grows
          with your emotional journey as you feed it with the fluids you extract
          from yourself through Activations: Blood, Sweat and Tears.
        </p>
        <p class="mt-5">
          Your Emoxy is what it eats. The more Drops you collect the more your
          Emoxy grows. Watch it crystallize, change color and morph. The balance
          of fluids determines what it will become.
        </p>
      </div>
      <div
        v-if="step === 2 || step === 3"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div v-if="step === 2" class="overflow-y-scroll">
          <p class="text-lg font-bold">Accounterparts</p>
          <Icon type="accounterparts" class="mt-5" />
          <p class="mt-5">
            Emotional Futures cannot be played alone. The game interface
            connects humans in a network of Accounterparts, or players.
          </p>
          <p class="mt-5">
            These Accounterparts are based on existing real-life relationships:
            romances, acquaintances, friendships.
          </p>
          <p class="mt-5">
            You can play each Activation either online or offline with the same
            Accounterpart. In doing so, you can invest deeper in the
            relationship, or realize new liquidity with different play partners
            each round.
          </p>
          <p class="mt-5">
            By activating and accounting for their mutual emotional investment
            through game play, Accounterparts grow their Emoxys.
          </p>
        </div>
        <div v-if="step === 3" class="overflow-y-scroll">
          <p class="text-lg font-bold">Connecting Accounterpart</p>
          <p class="mt-5">
            To connect with a new Accounterpart, go to your Accounterparts tab
            and select 'Plus Icon' on top right corner.
          </p>
          <p class="mt-5">
            A search field will pop up asking you to type in your
            Accounterpart's Emoxy name.
          </p>
          <p class="mt-5">
            If you type the correct Emoxy name of your Accounterpart you will be
            instantly connected, and can start playing Activations.
          </p>
          <p class="mt-5">
            Your Emoxy name is the key for you to be found in the Emotional
            Futures Network - keep it safe.
          </p>
        </div>
        <div
          class="w-full px-5 flex justify-between items-center justify-self-end"
        >
          <Icon
            type="arrow-l"
            @click="step <= 2 ? null : step--"
            :class="step <= 2 ? 'opacity-20' : ''"
          />
          <div class="flex justify-center items-center gap-1">
            <div
              v-for="n in 2"
              :class="step - 1 === n ? 'w-2 h-2' : 'w-1 h-1'"
              class="bg-white-100"
            ></div>
          </div>
          <Icon
            type="arrow-r"
            @click="step >= 3 ? null : step++"
            :class="step >= 3 ? 'opacity-20' : ''"
          />
        </div>
      </div>
      <div
        v-if="step === 4 || step === 5 || step === 6"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div v-if="step === 4" class="overflow-y-scroll">
          <p class="text-lg font-bold">Activations</p>
          <Icon type="activation" class="mt-5" />
          <p class="mt-5">
            Activations are unique tasks asking players to recall memories,
            discuss feelings and produce new emotional experiences.
          </p>
          <p class="mt-5">
            As you complete Activations from the eight core emotions, your Emoxy
            will express the emotion just played. You can only perform one
            Activation at a time, so both you and your Accounterpart need to
            commit to the task in play.
          </p>
        </div>
        <div v-if="step === 5" class="overflow-y-scroll">
          <p class="text-lg font-bold">How To Play an Activation?</p>
          <p class="mt-5">
            To start a new Activation you need to create an Activation Card. You
            can initiate it from the Accounterpart’s page, or by clicking to
            feed your Emoxy. You will follow these steps:
          </p>
          <p class="mt-5">
            1. Choose an Accounterpart<br />
            2. Choose an Emotion<br />
            3. Choose a Relationshape<br />
            4. Send Activation Invite<br />
          </p>
          <p class="mt-5">
            Once your Accounterpart has accepted the invitation, your task will
            be revealed.
          </p>
          <p class="mt-5">
            After completing the Activation, proceed to Accounting. Here you
            will take account of your experience and the value of your emotional
            exchange. Afterward, your account will be updated with the Blood,
            Sweat and Tears gained through the Activation. You must feed your
            Emoxy to bring the Activation to an end.
          </p>
        </div>
        <div v-if="step === 6" class="overflow-y-scroll">
          <p class="text-lg font-bold">Activation Invite</p>
          <p class="mt-5">
            To complete an Activation a player must invite an Accounterpart.
          </p>
          <p class="mt-5">
            After you confirmed an Activation, the invitation will be sent
            automatically to your Accounterpart. They need to accept the invite
            for you to start playing the Activation together.
          </p>
          <p class="mt-5">
            You can find the invitations received by clicking to feed your
            Emoxy, or in the Accounterpart page.
          </p>
          <p class="mt-5">
            Be aware that you can accumulate many Activation Invites, but you
            can only play one at a time.
          </p>
          <p class="font-bold mt-5">
            Remember, your Activation only comes to an end when both you and
            your Accounterpart feed your Emoxy.
          </p>
        </div>
        <div
          class="w-full px-5 flex justify-between items-center justify-self-end"
        >
          <Icon
            type="arrow-l"
            @click="step <= 4 ? null : step--"
            :class="step <= 4 ? 'opacity-20' : ''"
          />
          <div class="flex justify-center items-center gap-1">
            <div
              v-for="n in 3"
              :class="step - 3 === n ? 'w-2 h-2' : 'w-1 h-1'"
              class="bg-white-100"
            ></div>
          </div>
          <Icon
            type="arrow-r"
            @click="step >= 6 ? null : step++"
            :class="step >= 6 ? 'opacity-20' : ''"
          />
        </div>
      </div>
      <div
        v-if="step === 7 || step === 8"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div
          v-if="step === 7"
          class="flex flex-col items-center overflow-y-scroll"
        >
          <p class="text-lg font-bold w-full">Emotions</p>
          <div class="w-full">
            <Icon type="emotions" class="mt-5" />
          </div>
          <p class="mt-5">
            Emotional Futures allow players and their Accounterparts to activate
            their eight core emotions. These emotions form the foundation of the
            game.
          </p>
          <p class="mt-5">
            Like colors, primary emotions can be expressed at varying
            intensities and can mix with one another to form new compound
            emotions.
          </p>
          <div
            @click="step = 8"
            class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm mt-5"
          >
            <Icon type="eye" />
            <p class="font-bold">Emotions Wheel</p>
          </div>
        </div>
        <div
          v-if="step === 8"
          class="grow flex flex-col items-center overflow-hidden mt-5"
        >
          <p class="text-lg font-bold text-center">Emotions Wheel</p>
          <p class="text-lg text-center capitalize mt-5">
            {{ selectedEmotion.id ? selectedEmotion.name : 'Choose Emotion' }}
          </p>
          <Emotions
            v-model="selectedEmotion"
            :availableEmotions="emotions"
            class="mt-5"
          />
          <div class="mt-5">
            <p>
              {{ selectedEmotion.description }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="step === 9"
        class="grow flex flex-col items-center overflow-hidden mt-5"
      >
        <p class="text-lg font-bold w-full">Relationshapes</p>
        <p class="mt-5">
          Relationshapes are emotional programs that represent eight different
          models for understanding the human Emotional Operating System (EOS).
        </p>
        <p class="mt-5">
          Based on historical and contemporary psychological theory, they are
          tools that activate the production of emotional currencies.
        </p>
        <p class="mt-5">
          In order to unlock higher Relationshapes, collect Blood, the currency
          representing the balance of your emotional exchange.
        </p>
        <div
          @click="step = 10"
          class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm mt-5"
        >
          <Icon type="eye" />
          <p class="font-bold">Relationshapes</p>
        </div>
      </div>
      <div
        v-if="step === 10"
        class="grow flex flex-col items-center overflow-hidden mt-5"
      >
        <p class="text-lg font-bold text-center">Relationshapes</p>
        <div class="w-full h-full grid grid-cols-2 gap-2 mt-5">
          <LiRelationshape
            v-for="(relationshape, index) in relationshapes"
            @click="handleRelationshapeClick(relationshape)"
            :relationshape="relationshape"
          />
        </div>
      </div>
      <div
        v-if="step === 11"
        class="grow flex flex-col items-center overflow-hidden mt-5"
      >
        <p class="text-lg font-bold text-center capitalize">
          {{ selectedRelationshape.name }} Relationshape
        </p>
        <LiRelationshape
          class="max-w-[50%] max-h-[20%] mt-5"
          :relationshape="selectedRelationshape"
        />
        <div class="mt-5 overflow-y-scroll">
          <div v-html="selectedRelationshape.description"></div>
        </div>
      </div>
      <div
        v-if="step === 12 || step === 13 || step === 14"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div v-if="step === 12" class="overflow-y-scroll">
          <p class="text-lg font-bold">Accounting</p>
          <Icon type="drop-half" class="mt-5" />
          <p class="mt-5">
            After completing each Activation, you must proceed to the Accounting
            phase, where you extract Drops of Blood, Sweat and Tears. These
            fluids reflect the emotional energy you give to and receive from
            your Accounterpart.
          </p>
          <p class="mt-5">
            Accounting will synthesize your experiences and guide you through a
            series of extracting questions to pour yourself into your Emoxy.
          </p>
          <p class="mt-5">
            Each Relationshape has a specific set of Accounting steps that must
            be completed before you can collect your Drops and feed your Emoxy.
          </p>
          <p class="mt-5">
            Your Emoxy will move to a new growth phase based on the total sum of
            Blood, Sweat and Tears in your account. Your progress can be
            followed via a tracker bar representing the remaining quantity of
            Drops your Emoxy needs to grow.
          </p>
        </div>
        <div
          v-if="step === 13"
          class="flex flex-col items-center overflow-y-scroll"
        >
          <p class="text-lg font-bold">Accounting in Drops</p>
          <p class="mt-5">
            For each Activation you earn Blood, Sweat and Tears.
          </p>
          <p class="mt-5">
            Accounting will prompt you with elements of your Activation that
            will be measured by you:
          </p>
          <p class="mt-5">
            1. Account for your emotional outpour to earn Sweat Drops. <br />
            2. Account for your Accounterpart's emotional outpour to give them
            Tear Drops.
          </p>
          <p class="mt-5">
            After both Accounterparts have completed their Accounting they will
            be awarded Blood based on the balance of their emotional exchange.
          </p>
          <div
            @click="step = 14"
            class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm mt-5"
          >
            <Icon type="eye" />
            <p class="font-bold">Emotional Currencies</p>
          </div>
        </div>
        <div v-if="step === 14" class="flex flex-col items-center">
          <p class="text-lg font-bold text-center">Emotional Currencies</p>
          <div
            class="grow w-full px-10 flex flex-col justify-center items-center"
          >
            <div
              v-for="d in ['blood', 'sweat', 'tears']"
              class="relative flex flex-col items-center mt-10"
            >
              <img
                :src="`/imgs/drop-${d}.png`"
                class="w-12"
                :style="`transform: scale(${Number(currencyAmount) / 10});`"
              />
              <img
                :src="`/imgs/drop-${d}.png`"
                class="absolute z-[-10] w-12 grayscale"
              />
              <p class="mt-1 capitalize">{{ d }}</p>
            </div>
            <input
              v-model="currencyAmount"
              class="w-full mt-10"
              type="range"
              min="1"
              max="10"
            />
            <div class="w-full flex justify-between mt-1">
              <p class="font-bold">-</p>
              <p class="font-bold">+</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 15" class="mt-5 flex flex-col">
        <p class="text-lg font-bold">EOS</p>
        <p class="mt-5">
          Every human comes installed with an Emotional Operating System,
          referred to as EOS.
        </p>
        <p class="mt-5">
          The EOS constitutes all mechanisms in a human body that help form and
          process emotions - from facial expressions and organ-level responses
          to cognitive memory processes. These automated messaging systems are
          needed for humans to respond to their environments.
        </p>
      </div>
      <div
        class="w-full px-5 flex justify-between items-center justify-self-end"
        v-if="step === 12 || step === 13"
      >
        <Icon
          type="arrow-l"
          @click="step <= 12 ? null : step--"
          :class="step <= 12 ? 'opacity-20' : ''"
        />
        <div class="flex justify-center items-center gap-1">
          <div
            v-for="n in 2"
            :class="step - 11 === n ? 'w-2 h-2' : 'w-1 h-1'"
            class="bg-white-100"
          ></div>
        </div>
        <Icon
          type="arrow-r"
          @click="step >= 13 ? null : step++"
          :class="step >= 13 ? 'opacity-20' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  page: {
    type: Array,
    required: false
  }
})

const user = useSupabaseUser()
const overlay = useOverlay()

const step = ref(0)
const currencyAmount = ref('10')
const { isAndroid, isIos } = useDevice()

const emotions = await useEmotions()
const relationshapes: any = await useRelationshapes()

const selectedEmotion = ref({
  id: null,
  name: null,
  description: null,
  prompts: <any>[],
  say: <any>[],
  hear: 0
})
const selectedRelationshape = ref({
  id: null,
  name: null,
  description: null,
  accounting: <any>[]
})

onMounted(() => {
  if (overlay.value.type === 'menu') {
    if (overlay.value.page[0] === 'data-privacy') step.value = 1
  }

  if (overlay.value.type === 'manual') {
    if (overlay.value.page[0] === 'emoxy') step.value = 1
    if (overlay.value.page[0] === 'accounterparts') step.value = 2
    if (overlay.value.page[0] === 'activations') step.value = 4
    if (overlay.value.page[0] === 'emotions') {
      if (overlay.value.page[1] === 0) {
        step.value = 7
      } else {
        step.value = 8
        const f: any = emotions.find((e: any) => e.id === overlay.value.page[1])
        if (f) selectedEmotion.value = f
      }
    }
    if (overlay.value.page[0] === 'relationshapes') {
      if (overlay.value.page[1] === 0) {
        step.value = 9
      } else {
        step.value = 10
        const f: any = relationshapes.find(
          (r: any) => r.id === overlay.value.page[1]
        )
        if (f) selectedRelationshape.value = f
      }
    }
    if (overlay.value.page[0] === 'accounting') step.value = 11
  }
})

function handleRelationshapeClick(r: any) {
  selectedRelationshape.value = r
  step.value = 11
}

function handleOverlayClick(type: string, page?: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page || []
}

function handleLogoutClick() {
  logout()
  overlay.value.isOpen = false
}

async function handleDeleteClick() {
  if (!user.value) return

  const y = confirm(
    'Are you sure you want to delete all your data including your Emoxy?'
  )

  if (y) {
    await deleteUser(user.value?.id)
    logout()
  }
}
</script>

<style scoped>
* {
  pointer-events: auto;
}
</style>
