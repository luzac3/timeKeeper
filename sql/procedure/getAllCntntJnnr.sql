DROP PROCEDURE IF EXISTS getAllCntntJnnr;
DELIMITER //
-- ********************************************************************************************
-- getAllCntntJnnr コンテンツに紐づくユーザーを取得する
--
-- 【処理概要】
--  コンテンツに紐づくユーザーを取得する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _cntnt_cd         :コンテンツコード
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.7.30 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `getAllCntntJnnr`(
    IN `_cntnt_cd` CHAR(4)
    , OUT `exit_cd` INTEGER
)
COMMENT 'コンテンツに紐づくユーザー取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        SELECT
            TJ.JNNR_CD AS JNNR_CD
            ,TJ.JNNR_NM AS JNNR_NM
            ,TCJ.GTHR_FLG AS GTHR_FLG
        FROM
            T_CNTNT_JNNR TCJ
        LEFT OUTER JOIN T_JNNR TJ
            ON  TCJ.JNNR_CD = TJ.JNNR_CD
        WHERE
            CNTNT_CD = '",_cntnt_cd,"'
        ORDER BY
              JNNR_CD ASC
        ;
        ");

    SET @query_text = @query;

        -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
