DROP PROCEDURE IF EXISTS deleteCntntJnnr;
DELIMITER //
-- ********************************************************************************************
-- deleteCntntJnnr 洗替のためユーザーを一掃する
--
-- 【処理概要】
--  洗替のため、コンテンツに紐づいたユーザーを削除する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _cntnt_cd     : コンテンツコード
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.7.23 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `deleteCntntJnnr`(
    IN `_cntnt_cd` CHAR(4)
    , OUT `exit_cd` INTEGER
)
COMMENT '洗替ユーザー削除'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        DELETE FROM
            T_CNTNT_JNNR
        WHERE
            CNTNT_CD = '",_cntnt_cd,"'
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
